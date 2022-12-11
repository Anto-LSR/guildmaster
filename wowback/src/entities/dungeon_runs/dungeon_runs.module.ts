import { Module } from '@nestjs/common';
import { DungeonRunsService } from './dungeon_runs.service';
import { DungeonRunsController } from './dungeon_runs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GetTokenModule } from 'src/tools/get-token/get-token.module';
import { AffixesModule } from '../affixes/affixes.module';
import { CharacterModule } from '../character/character.module';
import { UsersModule } from '../user/user.module';
import { Dungeon_run } from './dungeon_runs.entity';
import { DungeonsModule } from '../dungeons/dungeons.module';
import { AuthModule } from 'src/auth/auth.module';
import { Affixe } from '../affixes/affixe.entity';
import { Dungeon } from '../dungeons/dungeon.entity';
import { Character } from '../character/character.entity';

@Module({
  controllers: [DungeonRunsController],
  providers: [DungeonRunsService],
  imports: [TypeOrmModule.forFeature([Dungeon_run, Affixe, Dungeon, Character]),
    DungeonsModule,
    GetTokenModule,
    AffixesModule,
    CharacterModule,
    AuthModule,
  ],
})
export class DungeonRunsModule { }
