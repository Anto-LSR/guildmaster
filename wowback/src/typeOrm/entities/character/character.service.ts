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
    try {
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
      characterEntity.activeSpec = characterInfo.data.active_spec.name;
      characterEntity.specId = characterInfo.data.active_spec.id;
      characterEntity.ilvl = characterInfo.data.average_item_level;
      //console.log(characterInfo);
      const kuku = await this.getCharacterMythicDungeons(characterEntity);
      return characterEntity;
    } catch (e) {
      console.log(e);
    }
  }

  /**
   *
   * @param character Retourne les informations sur le progress du précédent et de l'actuel raid du personnage
   * @returns
   */
  async getCharacterRaids(character: Character): Promise<Partial<Character>> {
    const app_token = await this.getTokenService.getAccessToken();
    const characterRaid = await axios.get(
      `https://eu.api.blizzard.com/profile/wow/character/${
        character.realm
      }/${character.name.toLowerCase()}/encounters/raids?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
    );
    // const characterRaid = await axios.get(
    //   `https://eu.api.blizzard.com/profile/wow/character/archimonde/lapintade/encounters/raids?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
    // );
    const partialCharacter: Partial<Character> = {};
    characterRaid.data.expansions.forEach((expansion) => {
      if (expansion.expansion.name === 'Shadowlands') {
        expansion.instances.forEach((instance) => {
          if (instance.instance.name === process.env.PREVIOUS_RAID) {
            instance.modes.forEach((mode) => {
              if (mode.difficulty.type === 'NORMAL') {
                partialCharacter.previousNormalProgress =
                  mode.progress.completed_count +
                  '/' +
                  mode.progress.total_count;
              }
              if (mode.difficulty.type === 'HEROIC') {
                partialCharacter.previousHeroicProgress =
                  mode.progress.completed_count +
                  '/' +
                  mode.progress.total_count;
              }
              if (mode.difficulty.type === 'MYTHIC') {
                partialCharacter.previousMythicProgress =
                  mode.progress.completed_count +
                  '/' +
                  mode.progress.total_count;
              }
            });
          }
          if (instance.instance.name === process.env.CURRENT_RAID) {
            instance.modes.forEach((mode) => {
              if (mode.difficulty.type === 'NORMAL') {
                partialCharacter.currentNormalProgress =
                  mode.progress.completed_count +
                  '/' +
                  mode.progress.total_count;
              }
              if (mode.difficulty.type === 'HEROIC') {
                partialCharacter.currentHeroicProgress =
                  mode.progress.completed_count +
                  '/' +
                  mode.progress.total_count;
              }
              if (mode.difficulty.type === 'MYTHIC') {
                partialCharacter.currentMythicProgress =
                  mode.progress.completed_count +
                  '/' +
                  mode.progress.total_count;
              }
            });
          }
        });
      }
    });
    return partialCharacter;
  }

  async getCharacterMythicDungeons(character: Character): Promise<string> {
    const app_token = await this.getTokenService.getAccessToken();
    try {
      const characterMythicDungeons = await axios.get(
        `https://eu.api.blizzard.com/profile/wow/character/${
          character.realm
        }/${character.name.toLowerCase()}/mythic-keystone-profile/season/${
          process.env.MYTHIC_SEASON
        }?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
      );
      //console.log(characterMythicDungeons.data.best_runs[0].duration);
      characterMythicDungeons.data.best_runs.forEach((run) => {
        console.log('--------------------------------------------------');
        console.log('----DURATION----');
        const date = new Date(run.duration);
        const seconds =
          date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        console.log(date.getMinutes() + ':' + seconds);
        console.log('----KEY LEVEL----');
        console.log(run.keystone_level);
        console.log('----AFFIXES----');
        run.keystone_affixes.forEach((affix) => {
          console.log(affix.name);
        });
        console.log('----MEMBERS----');
        run.members.forEach((member) => {
          console.log(member.character.name);
          console.log(
            'spec : ' +
              member.specialization.name +
              '-' +
              member.specialization.id,
          );
          console.log(run.dungeon.name);
          console.log(run.is_completed_within_time);
          console.log(JSON.stringify(run.mythic_rating.color));
          console.log(run.map_rating.rating);
        });
      });
      return 'michel';
    } catch (e) {
      console.log(e.code, 'Aucune donnée pour cette saison');
    }

    return null;
  }

  async getCharacterAchievements(character: Character): Promise<string> {
    const app_token = await this.getTokenService.getAccessToken();
    try {
      const characterAchievements = await axios.get(
        `https://eu.api.blizzard.com/profile/wow/character/${
          character.realm
        }/${character.name.toLowerCase()}/achievements?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
      );
      return characterAchievements.data.total_points;
    } catch (e) {}
  }

  async getCharacterGear(character: Character): Promise<string> {
    const app_token = await this.getTokenService.getAccessToken();
    try {
      const characterGear = await axios.get(
        `https://eu.api.blizzard.com/profile/wow/character/${
          character.realm
        }/${character.name.toLowerCase()}/equipment?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
      );
      return characterGear.data.equipped_items;
    } catch (e) {}
  }

  async getCharacterStats(character: Character): Promise<string> {
    const app_token = await this.getTokenService.getAccessToken();
    try {
      const characterStats = await axios.get(
        `https://eu.api.blizzard.com/profile/wow/character/${
          character.realm
        }/${character.name.toLowerCase()}/statistics?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
      );
      return characterStats.data;
    } catch (e) {}
  }
}
