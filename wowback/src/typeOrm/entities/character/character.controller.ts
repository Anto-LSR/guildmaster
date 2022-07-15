import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CharacterService } from './character.service';
import { AuthService } from 'src/auth/auth.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('character')
export class CharacterController {
    constructor(private readonly characterService: CharacterService,
        private readonly authService : AuthService) {}

    //@UseGuards(JwtAuthGuard)
    @Get('selected-character')
    async getSelectedCharacter(@Req() request: Request) {
        console.log('inside character controller');
        let user = await this.authService.verify(request.cookies.jwt);
        const character = await this.characterService.findByCharacterId(user.selectedCharacter);
        return character;
    }
}
