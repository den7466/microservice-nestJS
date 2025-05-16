import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TransactionType } from '../transaction.types';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Идентификатор пользователя',
    type: String,
  })
  @IsString()
  @Expose()
  userId: string;

  @ApiProperty({
    description: 'Сумма в копейках',
    type: String,
  })
  @IsString()
  @Expose()
  amount: string;

  @ApiProperty({
    description: 'Тип транзакции',
    required: false,
    enum: TransactionType,
  })
  @IsEnum(TransactionType)
  @Expose()
  transactionType?: TransactionType;

  @ApiProperty({
    description: 'Идентификатор получателя, если это перевод средств',
    type: String,
  })
  @IsString()
  @Expose()
  @IsOptional()
  recipient?: string;
}
