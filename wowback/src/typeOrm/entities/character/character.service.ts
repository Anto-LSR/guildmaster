import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetadataAlreadyExistsError, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Character } from './character.entity';
import axios from 'axios';

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

  async getCharacterInfo(characterId: string): Promise<any> {
    console.log(characterId);

    const character = await this.findByCharacterId(characterId);
    return character;
  }

  async getAllCharacters(user: User): Promise<Character[]> {
    return await this.characterRepository.find({
      where: { user: user },
      order: { level: 'DESC' },
    });
  }
}
