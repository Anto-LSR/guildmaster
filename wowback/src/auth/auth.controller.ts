import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { User } from 'src/typeOrm/entities/user/user.entity';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request, @Res() res: Response): Promise<void> {
    const jwtToken = await this.authService.login(req.user as User);
    res
      .status(202)
      .cookie('jwt', jwtToken.access_token, {
        sameSite: 'strict',
        path: '/',
        expires: new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * 7),
        httpOnly: true,
      })
      res.cookie('isAuthenticated', 'true', {
        expires: new Date(new Date().getTime() + 60 * 1000 * 60 * 24 * 7)
      })
      .send('cookie being initialized');
  }

  @UseGuards(JwtAuthGuard)
  @Post('get-user')
  async getUser(@Req() req: Request): Promise<User> {
    let user = await this.authService.verify(req.cookies.jwt);
    user.password = undefined;
    console.log('Inside auth controller :' , user)
    return user;
  }
}
