import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { GetTokenModule } from 'src/get-token/get-token.module';
import { Character } from 'src/typeOrm/entities/character/character.entity';
import { CharacterModule } from 'src/typeOrm/entities/character/character.module';
import { User } from 'src/typeOrm/entities/user/user.entity';
import { UsersModule } from 'src/typeOrm/entities/user/user.module';
import { LinkBnetService } from './link-bnet.service';

@Module({
  providers: [LinkBnetService],
  imports: [
    TypeOrmModule.forFeature([User, Character]),
    GetTokenModule,
    AuthModule,
    UsersModule,
    CharacterModule,
  ],
})
export class LinkBnetModule {}
