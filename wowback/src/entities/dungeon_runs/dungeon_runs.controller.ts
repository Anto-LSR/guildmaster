import { Controller } from '@nestjs/common';
import { DungeonRunsService } from './dungeon_runs.service';

@Controller('dungeon-runs')
export class DungeonRunsController {
  constructor(private readonly dungeonRunsService: DungeonRunsService) {}
}
