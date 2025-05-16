import { Module } from '@nestjs/common';
import { TransactionEntity } from './entities/transaction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import { InternalAccountModule } from 'src/internal/account/account.module';

@Module({
  imports: [
    InternalAccountModule,
    TypeOrmModule.forFeature([TransactionEntity]),
    DatabaseModule,
  ],
  controllers: [TransactionController],
  providers: [TransactionService, TransactionRepository],
})
export class TransactionModule {}
