import { Controller, Get, Req, Session, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { BnetInfoService } from './bnet-info.service';

@Controller('bnet-info')
export class BnetInfoController {
  constructor(private readonly userInfoService: BnetInfoService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(@Req() request: Request): Promise<Record<string, any>> {
    let token = request.cookies['token'];
    return this.userInfoService.getUserInfo(token);
  }

}
