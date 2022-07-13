import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { User } from 'src/typeOrm/entities/user/user.entity';
import { UsersService } from 'src/typeOrm/entities/user/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class RegisterService {
  constructor( private userService : UsersService) {}

  /**
   * Registers a user
   * @param request Request object from express
   * @returns
   */
  async registerUser(
    request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  ): Promise<any> {
    const formData = request.body;
    console.log(formData);
    /**
     * Inserts user in database
     */
    if (this.validateData(formData.email, formData.password)) {
      const saltOrRounds = 10;  

      let user = new User();
      user.email = formData.email;
      user.password = await bcrypt.hash(formData.password, saltOrRounds);
      console.log(user.password);
      
      console.log('Insertion en base de données...');

      if (this.userService.create(user)) {
        let data = { status: 'ok' };
        return data;
      } else {
        let data = { status: 'error' };
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
    console.log('Validation des données...');

    if (!this.isValidMail(mail)) {
      console.log('Mail invalide');

      return false;
    }

    if (!this.isValidPassword(password)) {
      console.log('Password invalide');
      return false;
    }
    console.log('Données valides');

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
