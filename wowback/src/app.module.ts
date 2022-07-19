import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BnetInfoModule } from './bnet-info/bnet-info.module';
import { LinkBnetModule } from './link-bnet/link-bnet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './typeOrm/entities/user/user.entity';
import { RegisterModule } from './register/register.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './typeOrm/entities/user/user.module';
import { CharacterModule } from './typeOrm/entities/character/character.module';
import { Character } from './typeOrm/entities/character/character.entity';
import { GetTokenModule } from './get-token/get-token.module';

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
      entities: [User, Character],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CharacterModule,
    GetTokenModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
