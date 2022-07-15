import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import qs from 'qs';
import { Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { Character } from 'src/typeOrm/entities/character/character.entity';
import { User } from 'src/typeOrm/entities/user/user.entity';

import { Repository } from 'typeorm';
import { CharacterService } from 'src/typeOrm/entities/character/character.service';

@Injectable()
export class LinkBnetService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Character)
    private charactersRepository: Repository<Character>,
    private readonly characterService: CharacterService,
  ) {}

  /**
   * Create a new token containing the access_token from battle.net then redirect the user to the frontend
   * @param code Token généré par bnet
   * @param response
   */
  async getAccessToken(code: string, response: Response, request: Request) {
    var qs = require('qs');
    var data = qs.stringify({
      redirect_uri: process.env.redirectUri,
      scope: 'wow.profile',
      grant_type: 'authorization_code',
      code: code,
    });
    var config = {
      method: 'post',
      url: 'https://us.battle.net/oauth/token',
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

    let user = await this.authService.verify(request.cookies.jwt);
    user.apiToken = token;
    user.bnetId = bnetInfo.data.id;
    user.battleTag = bnetInfo.data.battletag;
    user.tokenCreatedAt = new Date(Date.now()).valueOf() + '';
    user.bnetLinked = true
    this.usersRepository.save(user);
    //On récupère les personnages de l'utilisateur
    let wowAccounts = await axios.get(
      `https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&locale=fr_FR&access_token=${token}`,
    );
    const registeredCharacters = await this.charactersRepository.find();
    wowAccounts.data.wow_accounts.forEach(async (account) => {
      account.characters.forEach(async (character) => {
        try {
          let characterEntity = new Character();
          characterEntity.realm = character.realm.slug;
          characterEntity.class = character.playable_class.name;
          characterEntity.race = character.playable_race.name;
          let raceId = character.playable_race.id;
          characterEntity.gender = character.gender.type;
          let genderId = character.gender.type === 'MALE' ? 0 : 1;
          characterEntity.faction = character.faction.name;
          characterEntity.level = character.level;
          characterEntity.wowCharacterId = character.id;
          characterEntity.name = character.name;
          characterEntity.user = user;

          const mediaInfo = await axios.get(
            `https://eu.api.blizzard.com/profile/wow/character/${characterEntity.realm.toLowerCase()}/${characterEntity.name.toLowerCase()}/character-media?namespace=profile-eu&access_token=${token}&alt=/shadow/avatar/${raceId}-${genderId}.jpg`,
          );
          characterEntity.avatarUrl = mediaInfo.data.assets[0].value;
          characterEntity.mainPictureUrl = mediaInfo.data.assets[2].value;
          let insert = true;
          registeredCharacters.forEach((registeredCharacter) => {
            if (
              registeredCharacter.wowCharacterId ===
              characterEntity.wowCharacterId
            ) {
              insert = false;
            }
          });
          if (insert) {
            this.charactersRepository.save(characterEntity);
          } 
        } catch (e) {}
      });
    });
    
    response.redirect(process.env.frontUrl);
  }

  async getCharacterMedia(slug, name) {
    console.log('Getting media...');

    return await axios.get(
      `https://eu.api.blizzard.com/profile/wow/character/${slug}/${name}/character-media`,
    );
  }

  /**
   * Set the user wow_token and the user bnet infos in database
   * @param request
   * @param response
   * @param query
   */
  async setTokenAndBnetInfos(request: Request, response: Response, query) {
    console.log('Gestion token wow!');
    console.log(process.env.frontUrl);
    console.log(query.code);

    let user = await this.authService.verify(request.cookies.jwt);
    user.apiToken = query.code;

    await this.usersRepository.save(user);

    //TODO: Récupérer les personnages de l'utilisateur
    // const accountData = await this.getAccountData(user.apiToken);
    // console.log(accountData.data);

    response.redirect(process.env.frontUrl);
  }

  async getAccountData(token: string) {
    const accountData = await axios.get(
      `http://eu.battle.net/oauth/userinfo?region=eu&access_token=${token}`,
    );
    console.log('coucou');
    return accountData;
  }
}
