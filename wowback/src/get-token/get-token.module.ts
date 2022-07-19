import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GetTokenService } from './get-token.service';

@Module({
  imports: [HttpModule],
  providers: [GetTokenService],
  exports: [GetTokenService],
})
export class GetTokenModule {}
