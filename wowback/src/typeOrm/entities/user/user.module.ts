import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './user.service';

@Module({
    providers: [UsersService],
    exports: [UsersService],
    imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {}
