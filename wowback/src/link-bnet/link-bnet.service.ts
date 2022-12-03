import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Character } from 'src/typeOrm/entities/character/character.entity';
import { User } from 'src/typeOrm/entities/user/user.entity';
import { Repository } from 'typeorm';
import { CharacterService } from 'src/typeOrm/entities/character/character.service';
import { GetTokenService } from 'src/get-token/get-token.service';

@Injectable()
export class LinkBnetService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
    private readonly characterService: CharacterService,
    private readonly getTokenService: GetTokenService,
  ) {}

  /**
   * Récupère les informations BNET de l'utilisateur ainsi que les informations de ses personnages
   * @param code Token généré par bnet
   * @param response
   */
  async linkBnetUserInfos(code: string, response: Response, request: Request) {
    //On prépare la requête pour récupérer le token de l'utilisateur
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const qs = require('qs');
    const data = qs.stringify({
      redirect_uri: process.env.redirectUri,
      scope: 'wow.profile',
      grant_type: 'authorization_code',
      code: code,
    });
    const config = {
      method: 'post',
      url: 'https://eu.battle.net/oauth/token',
      headers: {
        Authorization: 'Basic ' + process.env.BLIZZARD_API_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };
    //On récupère le api token de l'utilisateur
    let token: string;
    await axios.request(config).then((res) => {
      token = res.data.access_token;
      response.cookie('token', res.data.access_token, {
        httpOnly: true,
      });
    });
    //On récupère les infos bnet de l'utilisateur
    const bnetInfo = await axios.get(
      `http://eu.battle.net/oauth/userinfo?region=eu&access_token=${token}`,
    );
    //On récupère l'utilisateur depuis la base
    const user = await this.authService.verify(request.cookies.jwt);
    //On lui affecte ses données BNET
    user.apiToken = token;
    user.bnetId = bnetInfo.data.id;
    user.battleTag = bnetInfo.data.battletag;
    user.tokenCreatedAt = new Date(Date.now()).valueOf() + '';
    user.bnetLinked = true;
    this.usersRepository.save(user);
    //On récupère le token CLIENT de l'application
    //TODO: Appeller ma méthode getCredentials() dans le service GetTokenService plutôt que de faire une requete à la zob
    const credentials = await this.getTokenService.getAccessToken();
    const app_token = credentials;
    //On récupère les personnages de l'utilisateur
    const wowAccounts = await axios.get(
      `https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&locale=en_GB&access_token=${token}`,
    );
    //On récupère les personnages de l'utilisateur qui ont déjà été mis en base
    const registeredCharacters = await this.characterService.getAllCharacters(
      user,
    );
    let wowCharacterId;
    //On itère sur les comptes WoW de l'utilisateur
    wowAccounts.data.wow_accounts.forEach(async (account) => {
      account.characters.forEach(async (character) => {
        try {
          //On itère sur les personnages de l'utilisateur et on hydrate les attributs d'une entité Character
          const characterEntity = new Character();
          characterEntity.realm = character.realm.slug;
          characterEntity.class = character.playable_class.name;
          characterEntity.race = character.playable_race.name;
          const raceId = character.playable_race.id;
          characterEntity.gender = character.gender.type;
          const genderId = character.gender.type === 'MALE' ? 0 : 1;
          characterEntity.faction = character.faction.name;
          characterEntity.level = character.level;
          characterEntity.wowCharacterId = character.id;
          characterEntity.name = character.name;
          characterEntity.user = user;
          //On récupère les données médias du personnage
          const mediaInfo = await axios.get(
            `https://eu.api.blizzard.com/profile/wow/character/${characterEntity.realm.toLowerCase()}/${characterEntity.name.toLowerCase()}/character-media?namespace=profile-eu&access_token=${app_token}&alt=/shadow/avatar/${raceId}-${genderId}.jpg`,
          );
          //On hydrate l'entité Character avec les données médias
          characterEntity.avatarUrl = mediaInfo.data.assets[0].value;
          characterEntity.mainPictureUrl = mediaInfo.data.assets[2].value;
          //On vérifie que le personnage n'est pas déjà en base
          let insert = true;
          let existingCharacter = new Character();
          registeredCharacters.forEach(async (registeredCharacter) => {
            if (
              registeredCharacter.wowCharacterId ==
              characterEntity.wowCharacterId
            ) {
              insert = false;
              //Si le personnage est déjà en base, on le met à jour
              existingCharacter = registeredCharacter;
              try {
                await this.charactersRepository.save(existingCharacter);
              } catch (e) {
                //<Rejected> Unhandle promise rejection
              }
            }
          });
          //Si le personnage n'est pas déjà en base, on l'ajoute

          if (insert) {
            wowCharacterId = characterEntity.wowCharacterId;
            this.charactersRepository.save(characterEntity);
            if (
              user.selectedCharacter == undefined ||
              user.selectedCharacter == null
            ) {
              user.selectedCharacter = wowCharacterId;
              this.usersRepository.save(user);
            }
          }
        } catch (e) {
          if (e.response.status === 404) {
            //Si la reponse est une 404, cela veut dire que le personnage n'a pas été misà jour depuis longtemps par blizzard, et qu'il n'est donc pas joué.
          }
          if (e.response.status === 401) {
            console.log('Unauthorized', e.response.status);
          }
        }
      });
    });
    //On redirige l'utilisateur sur le front
    response.redirect(process.env.frontUrl);
  }
}
