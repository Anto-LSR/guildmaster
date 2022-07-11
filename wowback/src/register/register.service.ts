import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class RegisterService {
  /**
   * Registers a user
   * @param request Request object from express
   * @returns
   */
  registerUser(request): boolean {
    const formData = request.body;


    if (!this.isValidMail(formData.email)) {
      return false;
    }

    if (!this.isValidPassword(formData.password)) {
      throw new BadRequestException('Password is too short');
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

  isValidPassword(password: string): boolean {
    if (password.length <= 7) {
      return false; 
    }

  }
}
