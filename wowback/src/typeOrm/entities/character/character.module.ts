import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { User } from '../user/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [CharacterService, AuthService, UsersService, JwtService],
  controllers: [CharacterController],
  exports: [CharacterService],
  imports: [TypeOrmModule.forFeature([Character, User])],
})
export class CharacterModule {}
