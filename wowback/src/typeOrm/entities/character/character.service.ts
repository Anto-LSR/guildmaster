import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Character } from './character.entity';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByCharacterId(characterId: string): Promise<Character> {
    return await this.characterRepository.findOneBy({
      wowCharacterId: characterId,
    });
  }
}
