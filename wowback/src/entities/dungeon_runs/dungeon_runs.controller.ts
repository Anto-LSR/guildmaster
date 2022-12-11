import { Controller, UseGuards, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Character } from '../character/character.entity';
import { CharacterService } from '../character/character.service';
import { DungeonRunsService } from './dungeon_runs.service';

@UseGuards(JwtAuthGuard)
@Controller('dungeon-runs')
export class DungeonRunsController {
  constructor(
    private readonly dungeonRunsService: DungeonRunsService,
    private readonly authService: AuthService,
    private readonly characterService: CharacterService,
  ) { }

  @Get('character-runs')
  async getCharacterRun(@Req() request: Request) {
    const user = await this.authService.verify(request.cookies.jwt);
    const character = await this.characterService.findByCharacterId(
      user.selectedCharacter,
    );
    const runs = await this.dungeonRunsService.getDungeonRuns(character);
    return runs;
  }

}
