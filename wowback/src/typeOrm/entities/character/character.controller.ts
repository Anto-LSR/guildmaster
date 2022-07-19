import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import axios from 'axios';
import { Character } from './character.entity';
import { GetTokenService } from 'src/get-token/get-token.service';

@UseGuards(JwtAuthGuard)
@Controller('character')
export class CharacterController {
  constructor(
    private readonly characterService: CharacterService,
    private readonly authService: AuthService,
    private readonly getTokenService: GetTokenService,
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
    const selectedCharacter = await this.characterService.getSelectedCharacter(
      user,
    );
    return selectedCharacter;
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
      const [characterHasBeenSet, characterInfo] = await Promise.all([
        this.characterService.setSelectedCharacter(user),
        this.characterService.getSelectedCharacter(user),
      ]);
      if (characterHasBeenSet) {
        return characterInfo;
      } else {
        throw new Error('Character has not been set');
      }
    }
    return null;
  }
}
