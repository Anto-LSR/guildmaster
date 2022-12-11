import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { Character } from './character.entity';
import axios from 'axios';
import { GetTokenService } from 'src/tools/get-token/get-token.service';
import { CharacterEquipmentSummary } from '../../dto/character-equipment-summary.interface';
import { Stats } from '../../dto/character-stats-summary.interface';

@Injectable()
export class CharacterService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly getTokenService: GetTokenService,
  ) { }

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

    if (selectedCharacter != null) {
      if (
        selectedCharacter.ilvl == null ||
        selectedCharacter.activeSpec == null ||
        selectedCharacter.specId == null
      ) {
        try {
          const characterInfo = await axios.get(
            `https://eu.api.blizzard.com/profile/wow/character/${selectedCharacter.realm
            }/${selectedCharacter.name.toLowerCase()}?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
          );
          //On récupère les données de blizzard et on les applique à notre entité character
          selectedCharacter.activeSpec = characterInfo.data.active_spec?.name;
          selectedCharacter.specId = characterInfo.data.active_spec?.id;
          await this.characterRepository.save(selectedCharacter);
          return selectedCharacter;
        } catch (e) {
          console.log('Erreur dans getSelectedCharacter()');
        }
      }
      return selectedCharacter;
    }




  }

  /**
   * Retourne les informations sur le progress du précédent et de l'actuel raid du personnage
   * @param character
   * @returns
   */
  async getCharacterRaids(character: Character) {
    const app_token = await this.getTokenService.getAccessToken();
    // const characterRaid = await axios.get(
    //   `https://eu.api.blizzard.com/profile/wow/character/${character.realm
    //   }/${character.name.toLowerCase()}/encounters/raids?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
    // );
    const characterRaid = await axios.get(
      `https://eu.api.blizzard.com/profile/wow/character/${character.realm
      }/${character.name.toLowerCase()}/encounters/raids?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
    );
    return characterRaid.data

  }

  /**
   * Retourne les informations sur les meilleures runs mythique du personnage
   * @param character
   * @returns
   */
  async getCharacterMythicDungeons(character: Character): Promise<string> {
    const app_token = await this.getTokenService.getAccessToken();
    try {
      const characterMythicDungeons = await axios.get(
        `https://eu.api.blizzard.com/profile/wow/character/${character.realm
        }/${character.name.toLowerCase()}/mythic-keystone-profile/season/${process.env.MYTHIC_SEASON
        }?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
      );

      //console.log(characterMythicDungeons.data);

      //Récupérer les médias du donjon concerné
      for (const run of characterMythicDungeons.data.best_runs) {
        const date = new Date(run.duration);
        const seconds =
          date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        //console.log(date.getMinutes() + ':' + seconds);
        run.duration = date.getMinutes() + ':' + seconds;
        try {
          const firstRes = await axios.get(
            `${run.dungeon.key.href}&access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
          );
          const dungeonMediaId = firstRes.data.dungeon.id;
          const secondRes = await axios.get(
            `https://eu.api.blizzard.com/data/wow/media/journal-instance/${dungeonMediaId}?access_token=${app_token}&namespace=static-eu&locale=en_GB`,
          );
          run.dungeon.media = secondRes.data.assets[0].value;
        } catch (e) {
          console.log(e);
        }
      }
      return characterMythicDungeons.data;
    } catch (e) {
      throw new HttpException('Aucune donnée pour cette saison', 204);
    }

    return null;
  }
  /**
   * Retourne les infos des achievements du personnage
   * @param character
   * @returnsbhn
   */
  async getCharacterAchievements(character: Character): Promise<any> {
    const app_token = await this.getTokenService.getAccessToken();
    if (character.achievement_points) {
      return character.achievement_points;
    } else {
      try {
        const characterAchievements = await axios.get(
          `https://eu.api.blizzard.com/profile/wow/character/${character.realm
          }/${character.name.toLowerCase()}/achievements?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
        );
        this.setCharacterAchievements(character, characterAchievements.data.total_points)
        return character.achievement_points;
      } catch (e) {
        console.log(e);
      }
    }
  }

  async setCharacterAchievements(character: Character, achievement_points: number) {
    character.achievement_points = achievement_points;
    await this.characterRepository.save(character);
  }

  /**
   * Retourne les informations de l'équipement du personnage
   * @param character
   * @returns
   */
  async getCharacterGear(character: Character) {
    const app_token = await this.getTokenService.getAccessToken();
    if (!character?.gear) {
      try {
        const characterGear = await axios.get(
          `https://eu.api.blizzard.com/profile/wow/character/${character.realm
          }/${character.name.toLowerCase()}/equipment?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
        );

        const gear: CharacterEquipmentSummary = characterGear.data;

        const equipped_items = gear.equipped_items.map((item) => {
          return {
            slot: item.slot.type,
            ilvl: item.level.value,
            id: item.item.id,
          };
        });
        this.setCharacterGear(character, equipped_items)
        return equipped_items;
      } catch (e) {
        console.log(e);
      }
    } else {
      return JSON.parse(character.gear);
    }
  }

  async setCharacterGear(character: Character, gear: object) {
    try {
      character.gear = JSON.stringify(gear)
      await this.characterRepository.save(character);
    } catch (e) {
      console.log('Erreur dans setCharacterGear');
    }
  }
  /**
   * Retourne les informations des stats du personnage
   * @param character
   * @returns
   */
  async getCharacterStats(character: Character): Promise<object> {
    const app_token = await this.getTokenService.getAccessToken();
    if (!character.stats) {
      try {
        const characterStats = await axios.get(
          `https://eu.api.blizzard.com/profile/wow/character/${character.realm
          }/${character.name.toLowerCase()}/statistics?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
        );
        const statsData: Stats = characterStats.data;
        const stats = {
          agility: statsData.agility,
          intellect: statsData.intellect,
          strength: statsData.strength,
          stamina: statsData.stamina,
          versatility_percent: statsData.versatility_damage_done_bonus,
          versatility: statsData.versatility,
          mastery: statsData.mastery,
          haste: statsData.melee_haste,
          crit: statsData.melee_crit,
        }
        this.setCharacterStats(character, stats);
        return stats;
      } catch (e) { }
    } else {
      return JSON.parse(character.stats);
    }
  }

  async setCharacterStats(character: Character, stats: object) {
    try {
      character.stats = JSON.stringify(stats);
      await this.characterRepository.save(character)
    } catch (e) {
      console.log('Erreur dans setCharacterStats()');

    }
  };

  async refreshCharacterData(character: Character) {
    // Personnage (genre race guilde etc...)
    // Equipement
    // Stats
    // Best runs
  }
}
