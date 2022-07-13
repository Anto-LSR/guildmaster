import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { UsersService } from 'src/typeOrm/entities/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeOrm/entities/user/user.entity';

@Module({
  providers: [LoginService, UsersService],
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [LoginController]
})
export class LoginModule {}
