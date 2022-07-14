import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { query, Request, Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { User } from 'src/typeOrm/entities/user/user.entity';
import { UsersService } from 'src/typeOrm/entities/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class LinkBnetService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,

  ) {}

  /**
   * Create a new token containing the access_token from battle.net then redirect the user to the frontend
   * @param code Token généré par bnet
   * @param response 
   */
   async getCode(code : string, response : Response){
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
            Authorization:
              'Basic ' + process.env.BLIZZARD_API_KEY,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: data,
        };
    
        await axios
          .request(config)
          .then((res) => {
            response.cookie('token', res.data.access_token, {
              httpOnly: true,
            });
            response.redirect(process.env.frontUrl);
          })
          .catch((error) => {
            console.log(error.message + 'coucou');
          });
    }

    /**
     * Set the user wow_token and the user bnet infos in database
     * @param request 
     * @param response 
     * @param query 
     */
     async setTokenAndBnetInfos(request : Request, response : Response, query){
      console.log('Gestion token wow!');
      console.log(process.env.frontUrl);
      console.log(query.code);

      let user = await this.authService.verify(request.cookies.jwt)
      user.apiToken = query.code;
      this.usersRepository.save(user);

      
     
      response.redirect(process.env.frontUrl);
    }
}
