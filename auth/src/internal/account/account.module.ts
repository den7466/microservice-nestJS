import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { InternalAccountService } from './account.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [InternalAccountService],
  exports: [InternalAccountService],
})
export class InternalAccountModule {}
