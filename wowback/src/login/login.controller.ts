import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}
    @Post()
    loginUser(@Req() request: Request): any {
        return this.loginService.loginUser(request);
    }
}
