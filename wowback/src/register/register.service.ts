import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { User } from 'src/entities/user/user.entity';
import { UsersService } from 'src/entities/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(private userService: UsersService) {}

  /**
   * Registers a user
   * @param request Request object from express
   * @returns
   */
  async registerUser(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  ): Promise<any> {
    const formData = request.body;
    /**
     * Inserts user in database
     */
    if (this.validateData(formData.email, formData.password)) {
      const saltOrRounds = 10;

      const user = new User();
      user.email = formData.email;
      user.password = await bcrypt.hash(formData.password, saltOrRounds);

      if (this.userService.create(user)) {
        const data = { status: 'ok' };
        return data;
      } else {
        const data = { status: 'error' };
        return data;
      }
    }
    return { status: 'error' };
  }

  /**
   * Checks if a user mail and password are valid
   * @param mail string
   * @param password string
   * @returns boolean
   */
  validateData(mail: string, password: string): boolean {
    if (!this.isValidMail(mail)) {
      return false;
    }

    if (!this.isValidPassword(password)) {
      return false;
    }

    return true;
  }

  /**
   * Checks if a user mail is valid
   * @param mail string
   * @returns boolean
   */
  isValidMail(mail: string): boolean {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      mail,
    );
  }
  /**
   * Checks if a user password is valid
   * @param password string
   * @returns
   */
  isValidPassword(password: string): boolean {
    return password.length >= 7;
  }
}
