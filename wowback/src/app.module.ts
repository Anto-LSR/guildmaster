import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetTokenService } from './get-token/get-token.service';
import { GetTokenController } from './get-token/get-token.controller';
import { LinkBnetController } from './link-bnet/link-bnet.controller';
import { ConfigModule } from '@nestjs/config';
import { UserInfoModule } from './user-info/user-info.module';
import { LinkBnetModule } from './link-bnet/link-bnet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './typeOrm/entities/user/user.entity';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { RegisterModule } from './register/register.module';
import { UsersService } from './typeOrm/entities/user/user.service';
import { LoginModule } from './login/login.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot(),
    UserInfoModule,
    LinkBnetModule,
    RegisterModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.dbHost,
      port: Number(process.env.dbPort),
      username: process.env.dbUsername,
      password: process.env.dbPassword,
      database: process.env.dbDatabase,
      entities: [User],
      synchronize: true,
    }),
    LoginModule,
  ],
  controllers: [AppController, GetTokenController],
  providers: [AppService, GetTokenService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
