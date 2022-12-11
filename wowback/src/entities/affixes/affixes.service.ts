import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Affixe } from './affixe.entity';

@Injectable()
export class AffixesService {
    constructor(
        @InjectRepository(Affixe)
        private readonly affixeRepository: Repository<Affixe>,
    ) { }

    async affixeExists(id: number) {
        const affixe = await this.affixeRepository.findOneBy({blizzard_id : id})
        if (affixe)
            return true;
        else
            return false;
    }
}
