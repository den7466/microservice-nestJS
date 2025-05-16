import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository, SelectQueryBuilder } from 'typeorm';
import { TransactionEntity } from './entities/transaction.entity';
import { FindTransactionParams } from './transaction.types';
import { GetTransactionsFilterDto } from './dto/get-transaction-filter.dto';
import { TransactionDto } from './dto/transaction.dto';

export class TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async createTransaction<T extends DeepPartial<TransactionEntity>>(
    entity: T,
  ): Promise<TransactionEntity> {
    return this.transactionRepository.save(entity);
  }

  async findById(transId: string): Promise<TransactionEntity> {
    return this.transactionRepository.findOneBy({ transId });
  }

  async findByParams(
    params: GetTransactionsFilterDto,
  ): Promise<{ items: TransactionDto[]; total: number }> {
    console.log(params);
    // TODO: Реализовать выборку по параметрам
    const result = await this.transactionRepository.find();
    return { items: result, total: result.length };
  }

  qb(
    params: FindTransactionParams = {},
    alias = 'transaction',
  ): SelectQueryBuilder<TransactionEntity> {
    const { userIds, transIds, amounts, type, take, skip } = params;
    const query = this.transactionRepository.createQueryBuilder(alias);

    if (userIds?.length) {
      query.andWhere(`${alias}.userId in (:...userIds)`, { userIds });
    }

    if (transIds?.length) {
      query.andWhere(`${alias}.transId in (:...transIds)`, { transIds });
    }

    if (amounts?.length) {
      query.andWhere(`${alias}.amount in (:...amounts)`, { amounts });
    }

    if (type?.length) {
      query.andWhere(`${alias}.type = :type`, { type });
    }

    // Paginate
    if (take) {
      query.take(take);
    }
    if (skip) {
      query.skip(skip);
    }

    return query;
  }
}
