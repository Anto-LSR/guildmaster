import { Injectable, Session } from '@nestjs/common';
import axios from 'axios';
import { writeFileSync } from 'fs';

@Injectable()
export class UserInfoService {
  async getUserInfo(token: string): Promise<Record<string, any>> {
    
    console.log('userinfo', token);
    
    const accountInfo = await axios.get(
      `http://eu.battle.net/oauth/userinfo?region=eu&access_token=${token}`,
    );
    //console.log(accountInfo.data);

    const profileInfo = await axios.get(
      `https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&access_token=${token}`,
    );
    //console.log(JSON.stringify(profileInfo.data.wow_accounts[0], null, 2));
    //writeFileSync('./profile.json', JSON.stringify(profileInfo.data, null, 2));

    const wowAccounts = profileInfo.data.wow_accounts;
    wowAccounts.forEach((account) => {
      account.characters.forEach((character) => {
        // let name = character.name;
        // let realm = character.realm;
        // let region = character.region;
        // let faction = character.faction;
        // let level = character.level;
        // let playableClass = character.playable_class;

        // console.log(name , realm.name.fr_FR , faction.type , level , playableClass.name.fr_FR);
        if (character.name === 'Ëver') {
          //console.log(character);
        }
      });
    });

    const mediaInfo = await axios.get(
      `https://eu.api.blizzard.com/profile/wow/character/hyjal/ëver/character-media?namespace=profile-eu&access_token=${token}`,
    );
    //console.log(mediaInfo.data);

    const guildInfo = await axios.get(
      `https://eu.api.blizzard.com/data/wow/guild/medivh/ouroboros/roster?namespace=profile-eu&access_token=${token}`,
    );
    //console.log(guildInfo.data.members);

    guildInfo.data.members.forEach((member) => {
      //console.log(member.rank);
      if (member.rank === 0) {
        console.log(member.character.name);
      }
    });

    return accountInfo.data;
  }

  async getUserCharacter(token: string): Promise<Record<string, any>> {
    //TODO: Récupérer l'id du personnage selectionné depuis la base de données
    let character = await axios.get(
      `https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&locale=fr_FR&access_token=${token}`,
    );
    return character.data;
  }
}
