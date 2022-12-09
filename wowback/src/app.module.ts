/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BnetInfoModule } from './bnet-auth/bnet-info/bnet-info.module';
import { LinkBnetModule } from './bnet-auth/link-bnet/link-bnet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArrayOverlap, DataSource } from 'typeorm';
import { User } from './entities/user/user.entity';
import { RegisterModule } from './register/register.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './entities/user/user.module';
import { CharacterModule } from './entities/character/character.module';
import { Character } from './entities/character/character.entity';
import { GetTokenModule } from './tools/get-token/get-token.module';
import { DungeonsModule } from './entities/dungeons/dungeons.module';
import { Dungeon } from './entities/dungeons/dungeon.entity';
import { Dungeon_run } from './entities/dungeon_runs/dungeon_runs.entity';
import { DungeonRunsModule } from './entities/dungeon_runs/dungeon_runs.module';
import { AffixesModule } from './entities/affixes/affixes.module';
import { Affixe } from './entities/affixes/affixe.entity';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    BnetInfoModule,
    LinkBnetModule, 
    RegisterModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.dbHost,
      port: Number(process.env.dbPort),
      username: process.env.dbUsername,
      password: process.env.dbPassword,
      database: process.env.dbDatabase,
      entities: [User, Character /*, Dungeon, Dungeon_run, Affixe*/],
      synchronize: true,
      //logging: ['query']
    }),
    AuthModule,
    UsersModule,
    CharacterModule,
    GetTokenModule,
    DungeonsModule,
    DungeonRunsModule,
    AffixesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
