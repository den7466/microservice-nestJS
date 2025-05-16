import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionType } from './transaction.types';
import { TransactionDto } from './dto/transaction.dto';
import { GetTransactionsFilterDto } from './dto/get-transaction-filter.dto';
import { TransactionRepository } from './transaction.repository';
import { InternalAccountService } from '../../internal/account/account.service';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly internalAccountService: InternalAccountService,
  ) {}

  async create(params: CreateTransactionDto): Promise<void> {
    const { userId, amount, transactionType, recipient } = params;

    if (transactionType == TransactionType.TRANSFER && recipient) {
      return this.createTransferTransaction(params);
    }

    await this.internalAccountService.changeBalance({
      userId,
      transactionType,
      amount: amount.toString(),
    });

    await this.transactionRepository.createTransaction({
      userId,
      amount,
      type: transactionType,
    });
  }

  async createTransferTransaction(params: CreateTransactionDto): Promise<void> {
    const { userId, amount, transactionType, recipient } = params;
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction('READ COMMITTED');
    try {
      await this.transactionRepository.createTransaction({
        userId,
        amount: '-' + amount,
        type: transactionType,
      });
      await this.internalAccountService.changeBalance({
        userId,
        transactionType: TransactionType.WITHDRAWL,
        amount: amount.toString(),
      });
      await this.transactionRepository.createTransaction({
        userId: recipient,
        amount: amount,
        type: transactionType,
      });
      await this.internalAccountService.changeBalance({
        userId: recipient,
        transactionType: TransactionType.DEPOSIT,
        amount: amount.toString(),
      });
      await queryRunner.commitTransaction();
      await queryRunner.release();
    } catch (error: unknown) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      throw error;
    }
  }

  async getTransaction(transId: string): Promise<TransactionDto> {
    return this.transactionRepository.findById(transId);
  }

  async getTransactions(
    params: GetTransactionsFilterDto,
  ): Promise<{ items: TransactionDto[]; total: number }> {
    return this.transactionRepository.findByParams(params);
  }
}
