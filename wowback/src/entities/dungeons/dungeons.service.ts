import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dungeon } from './dungeon.entity';

@Injectable()
export class DungeonsService {
    constructor(
        @InjectRepository(Dungeon)
        private readonly dungeonRepository: Repository<Dungeon>,
    ) { }

    async dungeonExists(id: number) {
        const dungeon = await this.dungeonRepository.findOneBy({ blizzard_id: id });
        if (dungeon)
            return true;
        else
            return false;
    }

    async findDungeonByBlizzardId(id: number){
        const dungeon = await this.dungeonRepository.findOneBy({ blizzard_id: id });
        return dungeon;
    }
}
