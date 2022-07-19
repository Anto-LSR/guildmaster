import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetadataAlreadyExistsError, Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Character } from './character.entity';
import axios from 'axios';
import { GetTokenService } from 'src/get-token/get-token.service';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly getTokenService: GetTokenService,
  ) {}

  /**
   * Retourneun personnage depuis la base de donnée
   * @param characterId Id du personnage
   * @returns
   */
  async findByCharacterId(characterId: string): Promise<Character> {
    return await this.characterRepository.findOneBy({
      wowCharacterId: characterId,
    });
  }
  async getCharacterInfo(characterId: string): Promise<any> {
    const character = await this.findByCharacterId(characterId);
    return character;
  }

  /**
   * Retourne tous les personnages de la base de données
   * @param user
   * @returns
   */
  async getAllCharacters(user: User): Promise<Character[]> {
    return await this.characterRepository.find({
      where: { user: user },
      order: { level: 'DESC' },
    });
  }
  /**
   * Définit le personnage selectionné par un utilisateur
   * @param user
   * @returns
   */
  async setSelectedCharacter(user: User): Promise<boolean> {
    if (await this.userRepository.save(user)) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Récupère le personnage selectionné par un utilisateur
   * @param user
   * @returns
   */
  async getSelectedCharacter(user: User): Promise<Character> {
    const app_token = await this.getTokenService.getAccessToken();
    const selectedCharacter = await this.getCharacterInfo(
      user.selectedCharacter,
    );
    const characterInfo = await axios.get(
      `https://eu.api.blizzard.com/profile/wow/character/${
        selectedCharacter.realm
      }/${selectedCharacter.name.toLowerCase()}?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
    );
    //On récupère les données de blizzard et on les applique à notre entité character
    const characterEntity = new Character();
    characterEntity.name = characterInfo.data.name;
    characterEntity.faction = characterInfo.data.faction.name;
    characterEntity.race = characterInfo.data.race.name;
    characterEntity.class = characterInfo.data.character_class.name;
    characterEntity.realm = characterInfo.data.realm.slug;
    characterEntity.guildName = characterInfo.data.guild?.name;
    characterEntity.level = characterInfo.data.level;
    characterEntity.wowCharacterId = characterInfo.data.id;
    characterEntity.gender = characterInfo.data.gender.type;
    characterEntity.avatarUrl = selectedCharacter.avatarUrl;
    characterEntity.mainPictureUrl = selectedCharacter.mainPictureUrl;
    return characterEntity;
  }

  async getCharacterRaids(character: Character): Promise<Partial<Character>> {
    const app_token = await this.getTokenService.getAccessToken();
    const characterRaid = await axios.get(
      `https://eu.api.blizzard.com/profile/wow/character/${
        character.realm
      }/${character.name.toLowerCase()}/encounters/raids?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
    );
    console.log(characterRaid.data);

    return null;
  }
}
