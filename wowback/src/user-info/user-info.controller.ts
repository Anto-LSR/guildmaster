import { Controller, Get, Req, Session, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { UserInfoService } from './user-info.service';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserInfo(@Req() request:Request): Promise<Record<string, any>> {
    let token = request.cookies['token']
    return this.userInfoService.getUserInfo(token);
  }

  @Get('selected-character')
  async getSelectedCharacter(@Req() request:Request): Promise<Record<string, any>> {
    console.log('coucou');
    
    let token = request.cookies['token']
    return this.userInfoService.getUserCharacter(token);
  }
}
