import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user/user.entity';
import { UsersService } from 'src/entities/user/user.service';
import { RegisterController } from './register.controller';
import { RegisterService } from './register.service';

@Module({
    providers: [RegisterService, UsersService], 
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [RegisterController],
})
export class RegisterModule {}
