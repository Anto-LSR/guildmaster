import {
  Controller,
  Get,
  Param,
  Query,
  Req,
  Res,
  Session,
  UseGuards,
} from '@nestjs/common';
import { query, Request, Response } from 'express';
import axios from 'axios';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LinkBnetService } from './link-bnet.service';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/typeOrm/entities/user/user.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeOrm/entities/user/user.entity';
import { Repository } from 'typeorm';
@UseGuards(JwtAuthGuard)
@Controller('bnet')
export class LinkBnetController {
  constructor(
    private readonly linkBnetService: LinkBnetService,
  ) {}
  @Get()
  async getCode(
    @Query('code') code: string,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    this.linkBnetService.getAccessToken(code, response, request);
  }

  @Get('bnet-infos')
   async getToken(
    @Query() query,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
     this.linkBnetService.setTokenAndBnetInfos(request, response, query);

 
  }
}
