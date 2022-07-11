import { Controller, Get, Req, Session } from '@nestjs/common';
import { Request } from 'express';
import { UserInfoService } from './user-info.service';

@Controller('user-info')
export class UserInfoController {
  constructor(private readonly userInfoService: UserInfoService) {}
  @Get()
  async getUserInfo(@Req() request:Request): Promise<Record<string, any>> {
    let token = request.cookies['token']
    return this.userInfoService.getUserInfo(token);
  }

  @Get('/selected-character')
  async getSelectedCharacter(@Req() request:Request): Promise<Record<string, any>> {
    let token = request.cookies['token']
    return this.userInfoService.getUserCharacter(token);
  }
}
