import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { GetTokenModule } from 'src/tools/get-token/get-token.module';
import { Character } from 'src/entities/character/character.entity';
import { CharacterModule } from 'src/entities/character/character.module';
import { User } from 'src/entities/user/user.entity';
import { UsersModule } from 'src/entities/user/user.module';
import { LinkBnetController } from './link-bnet.controller';
import { LinkBnetService } from './link-bnet.service';

@Module({
  controllers: [LinkBnetController],
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
