import { Controller, Get, Query, Req, Res, Session } from '@nestjs/common';
import { Request, Response } from 'express';
import axios from 'axios';

@Controller('user-login')
export class LinkBnetController {
  @Get()
  async getCode(
    @Query('code') code: string,
    @Res() response: Response,
  ): Promise<void> {
    var qs = require('qs');
    var data = qs.stringify({
      redirect_uri: process.env.redirectUri,
      scope: 'wow.profile',
      grant_type: 'authorization_code',
      code: code,
    });
    var config = {
      method: 'post',
      url: 'https://us.battle.net/oauth/token',
      headers: {
        Authorization:
          'Basic NTJjYTc0MzgxNDEwNGU1Nzk0NjFkZTJjMTEyZjIzMmU6eElwNzlhTzg3QVdTV3FGTnRWM2tPTjd2R2dLRFFpNWI=',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };

    await axios
      .request(config)
      .then((res) => {
        response.cookie('token', res.data.access_token, {
          httpOnly: true,
        });
        response.redirect(process.env.frontUrl);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
}
