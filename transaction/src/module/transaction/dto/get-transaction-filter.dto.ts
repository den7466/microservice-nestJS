import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransactionType } from '../transaction.types';

export class GetTransactionsFilterDto {
  @ApiProperty({
    description: 'Идентификаторы транзакций',
    type: [String],
  })
  @IsString()
  @IsOptional()
  @Expose()
  transIds: string[];

  @ApiProperty({
    description: 'Идентификаторы пользователей',
    type: [String],
  })
  @IsString()
  @IsOptional()
  @Expose()
  userIds: string[];

  @ApiProperty({
    description: 'Сумма',
    type: [String],
  })
  @IsString()
  @IsOptional()
  @Expose()
  amounts: string[];

  @ApiProperty({
    description: 'Тип транзакции',
    required: false,
    enum: TransactionType,
  })
  @IsEnum(TransactionType)
  @Expose()
  TransactionType?: TransactionType;

  @ApiProperty({
    description: '',
    type: Number,
    required: false,
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  readonly take?: number;

  @ApiProperty({
    description: '',
    type: Number,
    required: false,
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  readonly skip?: number;
}
