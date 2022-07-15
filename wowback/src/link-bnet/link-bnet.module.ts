import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Character } from 'src/typeOrm/entities/character/character.entity';
import { CharacterService } from 'src/typeOrm/entities/character/character.service';
import { User } from 'src/typeOrm/entities/user/user.entity';
import { UsersService } from 'src/typeOrm/entities/user/user.service';
import { LinkBnetController } from './link-bnet.controller';
import { LinkBnetService } from './link-bnet.service';

@Module({
  controllers: [LinkBnetController],
  providers: [LinkBnetService, AuthService, UsersService, JwtService, CharacterService  ],
  imports: [TypeOrmModule.forFeature([User, Character])],

})
export class LinkBnetModule {}
