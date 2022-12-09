import { Module } from '@nestjs/common';
import { DungeonsService } from './dungeons.service';
import { DungeonsController } from './dungeons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dungeon } from './dungeon.entity';

@Module({
  controllers: [DungeonsController],
  providers: [DungeonsService],
  imports: [TypeOrmModule.forFeature([Dungeon])],
})
export class DungeonsModule {}
