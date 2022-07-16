import { Injectable, Session } from '@nestjs/common';
import axios from 'axios';
import { writeFileSync } from 'fs';

@Injectable()
export class BnetInfoService {
  async getUserInfo(token: string): Promise<Record<string, any>> {
    
    console.log('userinfo', token);
    
    const accountInfo = await axios.get(
      `http://eu.battle.net/oauth/userinfo?region=eu&access_token=${token}`,
    );
    console.log(accountInfo.data);

    // const profileInfo = await axios.get(
    //   `https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&access_token=${token}`,
    // );
    //console.log(JSON.stringify(profileInfo.data.wow_accounts[0], null, 2));
    //writeFileSync('./profile.json', JSON.stringify(profileInfo.data, null, 2));



    return accountInfo.data;
  }

  async getUserCharacter(token: string): Promise<Record<string, any>> {
    //TODO: Récupérer l'id du personnage selectionné depuis la base de données
    const character = await axios.get(
      `https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&locale=en_GB&access_token=${token}`,
    );
    return character.data;
  }
}
