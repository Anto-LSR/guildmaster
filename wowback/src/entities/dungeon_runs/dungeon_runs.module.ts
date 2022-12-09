import { Module } from '@nestjs/common';
import { DungeonRunsService } from './dungeon_runs.service';
import { DungeonRunsController } from './dungeon_runs.controller';
import { Dungeon_run } from './dungeon_runs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [DungeonRunsController],
  providers: [DungeonRunsService],
  imports: [TypeOrmModule.forFeature([Dungeon_run])],
})
export class DungeonRunsModule {}
