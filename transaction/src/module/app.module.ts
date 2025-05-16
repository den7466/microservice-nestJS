import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './transaction/transaction.module';
import { DatabaseModule } from './database/database.module';
import { InternalAccountModule } from 'src/internal/account/account.module';

@Module({
  imports: [
    TransactionModule,
    ConfigModule.forRoot(),
    DatabaseModule,
    InternalAccountModule,
  ],
})
export class AppModule {}
