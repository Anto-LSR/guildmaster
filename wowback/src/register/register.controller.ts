import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { RegisterService } from './register.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}
  @Post()
  registerUser(@Req() request: Request): any {
    return this.registerService.registerUser(request);
  }
}
