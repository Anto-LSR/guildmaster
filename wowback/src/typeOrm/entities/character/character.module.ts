import { Module } from '@nestjs/common';
import { CharacterService } from './character.service';
import { CharacterController } from './character.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from './character.entity';
import { User } from '../user/user.entity';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { GetTokenModule } from 'src/get-token/get-token.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from '../user/user.module';

@Module({
  providers: [CharacterService],
  controllers: [CharacterController],
  exports: [CharacterService],
  imports: [
    TypeOrmModule.forFeature([Character, User]),
    GetTokenModule,
    AuthModule,
    UsersModule,
    JwtModule,
  ],
})
export class CharacterModule {}
