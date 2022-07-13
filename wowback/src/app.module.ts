import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetTokenService } from './get-token/get-token.service';
import { GetTokenController } from './get-token/get-token.controller';
import { ConfigModule } from '@nestjs/config';
import { UserInfoModule } from './user-info/user-info.module';
import { LinkBnetModule } from './link-bnet/link-bnet.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './typeOrm/entities/user/user.entity';
import { RegisterModule } from './register/register.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './typeOrm/entities/user/user.module';



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
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, GetTokenController],
  providers: [AppService, GetTokenService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
