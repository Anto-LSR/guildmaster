import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import axios from 'axios';

@UseGuards(JwtAuthGuard)
@Controller('character')
export class CharacterController {
  constructor(
    private readonly characterService: CharacterService,
    private readonly authService: AuthService,
  ) {}

  @Get('selected-character')
  async getSelectedCharacter(@Req() request: Request) {
    const user = await this.authService.verify(request.cookies.jwt);
    const character = await this.characterService.findByCharacterId(
      user.selectedCharacter,
    );
    return character;
  }

  @Get('character-info')
  async getCharacterInfo(@Req() request: Request) {
    const user = await this.authService.verify(request.cookies.jwt);
    const token = user.apiToken;
    const selectedCharacter = await this.characterService.getCharacterInfo(
      user.selectedCharacter,
    );
    console.log(selectedCharacter);

    const characterInfo = await axios.get(
      `https://eu.api.blizzard.com/profile/wow/character/${
        selectedCharacter.realm
      }/${selectedCharacter.name.toLowerCase()}?access_token=${token}&namespace=profile-eu&locale=en_GB`,
    );

    characterInfo.data['avatar'] = selectedCharacter.avatarUrl;

    return characterInfo.data;
  }

  @Get('all-characters')
  async getAllCharacters(@Req() request: Request) {
    const user = await this.authService.verify(request.cookies.jwt);
    const characters = await this.characterService.getAllCharacters(user);
    return characters;
  }

  @Post('set/selected-character')
  async setSelectedCharacter(@Req() request: Request) {
    const user = await this.authService.verify(request.cookies.jwt);
    const id = request.body.wowCharacterId;
    const character = await this.characterService.findByCharacterId(id);
    if (character) {
      user.selectedCharacter = request.body.wowCharacterId;
      await this.characterService.setSelectedCharacter(user);
      const token = user.apiToken;
      const characterInfo = await axios.get(
        `https://eu.api.blizzard.com/profile/wow/character/${
          character.realm
        }/${character.name.toLowerCase()}?access_token=${token}&namespace=profile-eu&locale=en_GB`,
      );
      characterInfo.data['avatar'] = character.avatarUrl;
      return characterInfo.data;
    }
    return null;
  }
}
