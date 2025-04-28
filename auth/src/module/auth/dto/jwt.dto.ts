import { ApiProperty } from '@nestjs/swagger';

export class JwtDto {
  @ApiProperty({
    description: 'access JWT',
    required: true,
    type: String,
  })
  access: string;

  @ApiProperty({
    description: 'refresh JWT',
    required: true,
    type: String,
  })
  refresh: string;
}

export class RefreshJwtDto {
  @ApiProperty({
    description: 'refresh JWT',
    required: true,
    type: String,
  })
  refresh: string;
}
