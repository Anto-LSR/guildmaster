import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/typeOrm/entities/user/user.entity';
import { UsersService } from 'src/typeOrm/entities/user/user.service';
import { LinkBnetController } from './link-bnet.controller';
import { LinkBnetService } from './link-bnet.service';

@Module({
  controllers: [LinkBnetController],
  providers: [LinkBnetService, AuthService, UsersService, JwtService, ],
  imports: [TypeOrmModule.forFeature([User])],

})
export class LinkBnetModule {}
