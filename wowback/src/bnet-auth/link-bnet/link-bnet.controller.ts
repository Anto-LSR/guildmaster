import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { LinkBnetService } from './link-bnet.service';

@UseGuards(JwtAuthGuard)
@Controller('bnet')
export class LinkBnetController {
  constructor(private readonly linkBnetService: LinkBnetService) {}
  @Get()
  async getCode(
    @Query('code') code: string,
    @Res() response: Response,
    @Req() request: Request,
  ): Promise<void> {
    this.linkBnetService.linkBnetUserInfos(code, response, request);
  }
}
