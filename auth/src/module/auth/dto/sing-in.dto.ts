import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SingInDto {
  @ApiProperty({
    description: 'Логин пользователя',
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'Поле "login" должно быть заполнено' })
  @IsString({ message: 'Поле "login" должно быть строкой' })
  readonly login: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    required: true,
    type: String,
  })
  @IsNotEmpty({ message: 'Поле "password" должно быть заполнено' })
  @IsString({ message: 'Поле "password" должно быть строкой' })
  readonly password: string;
}
