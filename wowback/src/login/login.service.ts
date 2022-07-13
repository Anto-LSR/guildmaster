import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { UsersService } from 'src/typeOrm/entities/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/typeOrm/entities/user/user.entity';

@Injectable()
export class LoginService {
  constructor(private userService: UsersService) {}

  async loginUser(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  ): Promise<any> {
    const formData = request.body;
    let user = new User();

    user = await this.userService.findByEmail(formData.email);

    const isMatch = await bcrypt.compare(formData.password, user.password);
    if (isMatch) {
      return true;
    } else {
      return false;
    }
  }
}
