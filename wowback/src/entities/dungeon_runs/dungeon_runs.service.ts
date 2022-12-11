import { Injectable, HttpException } from '@nestjs/common';
import { GetTokenService } from 'src/tools/get-token/get-token.service';
import { Character } from '../character/character.entity';
import { DungeonsService } from '../dungeons/dungeons.service';
import { DungeonsProfile } from '../../dto/mythic-dungeons-profile.interface';

import axios from 'axios';
import { AffixesService } from '../affixes/affixes.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Dungeon_run } from './dungeon_runs.entity';
import { ArrayContains, DataSource, In, MoreThan, Repository, SelectQueryBuilder } from 'typeorm';
import { Dungeon } from '../dungeons/dungeon.entity';
import { Affixe } from '../affixes/affixe.entity';
import { CharacterService } from '../character/character.service';

@Injectable()
export class DungeonRunsService {
    constructor(
        private readonly dungeonService: DungeonsService,
        private readonly getTokenService: GetTokenService,
        private readonly affixesService: AffixesService,
        private readonly characterService: CharacterService,
        @InjectRepository(Dungeon_run)
        private readonly dungeonRunRepository: Repository<Dungeon_run>,
        @InjectRepository(Affixe)
        private readonly affixeRepository: Repository<Affixe>,
        @InjectRepository(Dungeon)
        private readonly dungeonRepository: Repository<Dungeon>,
        @InjectRepository(Character)
        private readonly characterRepository: Repository<Character>,
    ) { }
    async getDungeonRuns(character: Character) {
        const app_token = await this.getTokenService.getAccessToken();
        const character_dungeon_runs = await this.getCharacterDungeonRuns(character);


        if (character_dungeon_runs != null) {
            return character_dungeon_runs;
        } else {
            //On récupère les runs du personnage
            try {
                const characterMythicDungeons = await axios.get(
                    `https://eu.api.blizzard.com/profile/wow/character/${character.realm
                    }/${character.name.toLowerCase()}/mythic-keystone-profile/season/${process.env.MYTHIC_SEASON
                    }?access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
                );
                const dungeonProfile: DungeonsProfile = characterMythicDungeons.data;
                const colorString = JSON.stringify(dungeonProfile.mythic_rating.color).replace(/[^0-9,]/g, "");
                //On en profite pour attribuer son score mythique au personnage
                character.mythic_rating_color = colorString;
                character.mythic_rating = dungeonProfile.mythic_rating.rating;
                this.characterRepository.save(character);

                //On itère sur les runs retournée par l'api 
                for (const run of dungeonProfile.best_runs) {
                    //On vérifie si le donjon et les affixes sont déjà en base
                    const dungeon_id = run.dungeon.id;
                    const dungeonExists = await this.dungeonService.dungeonExists(dungeon_id);
                    if (!dungeonExists) {
                        //insert dungeon
                        const dungeon = new Dungeon();
                        dungeon.blizzard_id = dungeon_id;
                        dungeon.name = run.dungeon.name;
                        const firstRes = await axios.get(
                            `${run.dungeon.key.href}&access_token=${app_token}&namespace=profile-eu&locale=en_GB`,
                        );
                        const dungeonMediaId = firstRes.data.dungeon.id;
                        const secondRes = await axios.get(
                            `https://eu.api.blizzard.com/data/wow/media/journal-instance/${dungeonMediaId}?access_token=${app_token}&namespace=static-eu&locale=en_GB`,
                        );
                        dungeon.media = secondRes.data.assets[0].value;
                        await this.dungeonRepository.save(dungeon);
                    }
                    const affixes = run.keystone_affixes;
                    for (const affix of affixes) {
                        const affixExists = await this.affixesService.affixeExists(affix.id)
                        if (!affixExists) {
                            //insert affixe
                            const newAffix = new Affixe();
                            newAffix.blizzard_id = affix.id;
                            newAffix.name = affix.name;
                            await this.affixeRepository.save(newAffix);
                        }
                    }
                    //////////////////////////////////////////////////////////////

                    //On vérifie si la run est déjà en base
                    const dbRun = await this.findMythicDungeonRun(run.completed_timestamp)
                    //Si elle n'existe pas
                    if (!dbRun) {
                        //On vérifie si une run sur ce donjon existe pour ce personnage
                        const previousRun = await this.findRunByCharacterAndDungeonId(character, run.dungeon.id)
                        if (previousRun) {
                            //Si une run précédente existe et qu'elle est moins bien que la run actuelle on n'ajoute pas la run
                            const previousRunCharArray = [];
                            if (previousRun.rating < run.mythic_rating.rating) {
                                for (const member of previousRun.characters) {
                                    if (member.id != character.id) {
                                        previousRunCharArray.push(member);
                                    }
                                }
                                previousRun.characters = previousRunCharArray;
                                await this.dungeonRunRepository.save(previousRun);
                            }
                        }


                        //On insert la run
                        const newRun = new Dungeon_run();
                        newRun.completed_timestamp = run.completed_timestamp;
                        const date = new Date(run.duration);
                        const seconds =
                            date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
                        run.duration = date.getMinutes() + ':' + seconds;
                        newRun.duration = run.duration;
                        newRun.is_completed_within_time = run.is_completed_within_time;
                        newRun.keystone_level = run.keystone_level;
                        newRun.color_rating = JSON.stringify(run.mythic_rating.color).replace(/[^0-9,]/g, "");
                        newRun.rating = run.mythic_rating.rating;
                        newRun.dungeon_id = run.dungeon.id;
                        newRun.dungeon_name = run.dungeon.name;
                        //On attribue les affixe à la run
                        newRun.affixes = run.keystone_affixes.map(affix => {
                            const aff = new Affixe();
                            aff.name = affix.name;
                            aff.blizzard_id = affix.id;
                            return aff
                        })

                        //on attribue les membres à la run (si ils existent en base et si ils n'ont pas une meilleure run sur ce donjon)
                        const charArray = [];
                        for (const member of run.members) {
                            //On récupère un membre
                            const char = await this.characterService.findByCharacterId(member.character.id.toString());
                            if (char && char.id != character.id) {
                                //On récupère les run d'un des autres membre de la run
                                const charRuns = await this.getCharacterDungeonRuns(char);
                                //On itère sur ses runs existantes
                                if (charRuns) {
                                    for (const charRun of charRuns) {
                                        if (charRun.dungeon_id == newRun.dungeon_id) {
                                            //Si la nouvelle run est meilleure pour l'un des membres
                                            if (charRun.rating < newRun.rating) {
                                                //On l'ajoute à la run 
                                                charArray.push(char)
                                                //et on le retire de la précédente
                                                const oldRunCharacters = [];
                                                for (const member of charRun.characters) {
                                                    if (member.id != char.id) {
                                                        oldRunCharacters.push(member)
                                                    }
                                                }
                                                charRun.characters = oldRunCharacters;
                                                await this.dungeonRunRepository.save(charRun);
                                            } else {
                                                //Sinon on le retire de la run
                                            }
                                        }
                                    }
                                }

                            }
                        }
                        //On ajoute le personnage à la run
                        charArray.push(character);
                        if (charArray.length) {
                            newRun.characters = charArray;
                        }
                        //On attribue le donjon à la run
                        newRun.dungeon = await this.dungeonService.findDungeonByBlizzardId(newRun.dungeon_id);
                        await this.dungeonRunRepository.save(newRun);
                        await this.characterRepository.save(character);
                    }
                    //Si elle existe
                    else {
                        //On ajoute la run au personnage 
                        const charArray = [];
                        for (const member of dbRun.characters) {
                            //On récupère le membre de la run
                            const char = await this.characterService.findByCharacterId(member.wowCharacterId.toString());
                            if (char) {
                                //On vérifie que le membre n'ait pas déjà une meilleure run
                                const charRuns = await this.getCharacterDungeonRuns(char)
                                //On itère sur les runs du membre
                                for (const charRun of charRuns) {
                                    if ((charRun.dungeon_id == dbRun.dungeon_id) && (charRun.rating < dbRun.rating)) {
                                        charArray.push(char);
                                    }
                                }
                            }
                        }
                        await this.dungeonRunRepository.save(dbRun);

                        //On vérifie si c'est la première run du personnage sur ce donjon
                        const oldRun: Dungeon_run = await this.findRunByCharacterAndDungeonId(character, run.dungeon.id)
                        //Si c'est la premiere run sur ce donjon
                        if (!oldRun) {
                            //insert run
                            const newRun = new Dungeon_run();
                            newRun.completed_timestamp = run.completed_timestamp;
                            newRun.duration = run.duration;
                            newRun.is_completed_within_time = run.is_completed_within_time;
                            newRun.keystone_level = run.keystone_level;
                            newRun.color_rating = JSON.stringify(run.mythic_rating.color);
                            newRun.rating = run.mythic_rating.rating;
                            newRun.dungeon_id = run.dungeon.id;
                            newRun.dungeon_name = run.dungeon.name;
                            //On attribue les affixe à la run
                            newRun.affixes = run.keystone_affixes.map(affix => {
                                const aff = new Affixe();
                                aff.name = affix.name;
                                aff.blizzard_id = affix.id;
                                return aff
                            })
                            //on attribue les membres à la run (si ils existent en base)
                            const charArray = [];
                            for (const member of run.members) {
                                const char = await this.characterService.findByCharacterId(member.character.id.toString());
                                if (char) {
                                    //On vérifie que le membre n'ait pas déjà une meilleure run
                                    const charRuns = await this.getCharacterDungeonRuns(char)
                                    if (charRuns) {
                                        for (const charRun of charRuns) {
                                            if ((charRun.dungeon_id == newRun.dungeon_id) && (charRun.rating < newRun.rating)) {
                                                charArray.push(char);
                                            }
                                        }
                                    }



                                }
                            }
                            newRun.characters = charArray;
                            await this.dungeonRunRepository.save(newRun);

                        } else {
                            //Si ce n'est pas la première run du personnage sur ce donjon
                            //On récupère sa run précédente (oldRun)
                            let stillBestForSomeone: boolean = true;
                            for (const char of oldRun.characters) {
                                const run = await this.isCharacterBestRun(char, oldRun.dungeon_id, oldRun.rating)
                                if (run != null) {
                                    stillBestForSomeone = false;
                                }
                            }
                            //Si la run n'est la meilleure pour aucun des membres
                            //On la supprime
                            if (!stillBestForSomeone) {
                                await this.dungeonRunRepository.remove(oldRun)
                            }
                        }
                    }
                }
            } catch (error) {
                console.log(error);

                throw new HttpException('Aucune donnée pour cette saison', 204);
            }
            const character_dungeon_runs = await this.getCharacterDungeonRuns(character);
            return character_dungeon_runs;
        }
    }

    async findMythicDungeonRun(completed_timestamp: string) {
        const run = await this.dungeonRunRepository.findOne({
            where: {
                completed_timestamp: completed_timestamp
            }
        })
        if (run) {
            return run;
        }
        return false;
    }

    async findRunByCharacterAndDungeonId(character: Character, dungeon_id: number) {
        const run: Dungeon_run = await this.dungeonRunRepository.findOne({
            relations: ['characters'],
            where: { characters: { id: character.id }, dungeon_id: dungeon_id }
        })
        return run;
    }

    async isCharacterBestRun(character, dungeon_id, mythic_rating) {
        const run: Dungeon_run = await this.dungeonRunRepository.findOne({
            relations: ['characters'],
            where: {
                characters: { id: character.id },
                dungeon_id: dungeon_id,
                rating: MoreThan(mythic_rating)
            }
        })
        return run;
    }

    async getCharacterDungeonRuns(character: Character) {
        const runs = await this.dungeonRunRepository.find({
            relations: ['characters', 'dungeon'],
            where: {
                characters: { id: character.id }//character
            }
        })
        if (runs.length > 0)
            return runs
        return null;
    }


}
