import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class GetUsersFilterDto {
  @ApiProperty({
    description: '',
    type: [String],
    required: true,
    example: ['51868538-077d-4f30-adda-fec6e18e4b30'],
  })
  @IsOptional()
  @IsString({
    each: true,
    message: 'Поля в массиве "clientIds" должны быть строками',
  })
  readonly userIds?: string[];

  @ApiProperty({
    description: '',
    type: [String],
    required: true,
    example: ['79001110102', '79001110103'],
  })
  @IsOptional()
  @IsString({
    each: true,
    message: 'Поля в массиве "userIds" должны быть строками ',
  })
  readonly phones?: string[];

  @ApiProperty({
    description: '',
    type: String,
    example: 'login',
  })
  @IsOptional()
  @IsString()
  readonly login?: string;

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
