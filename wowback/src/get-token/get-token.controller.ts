import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/app.service';
import { GetTokenService } from './get-token.service';

@Controller('get-token')
export class GetTokenController {
  constructor(private readonly getToken: GetTokenService) {}

  @Get()
  token(): any {
   return this.getToken.getAccessToken();
  }
}
