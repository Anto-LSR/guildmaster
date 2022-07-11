import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Observable, pluck } from 'rxjs';
import { ClientCredentials } from 'src/Client-credentials';

@Injectable()
export class GetTokenService {
  constructor(private readonly httpService: HttpService) {
    this.getCredentials();
  }
  clientCredential: ClientCredentials;
  

  async getCredentials(): Promise<ClientCredentials> {
    var qs = require('qs');
    var data = qs.stringify({
      grant_type: 'client_credentials',
    });
    var config = {
      method: 'post',
      url: 'https://us.battle.net/oauth/token',
      headers: {
        Authorization:
          'Basic NTJjYTc0MzgxNDEwNGU1Nzk0NjFkZTJjMTEyZjIzMmU6eElwNzlhTzg3QVdTV3FGTnRWM2tPTjd2R2dLRFFpNWI=',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
    };
    let token = await this.httpService.axiosRef.request(config);
    this.clientCredential = new ClientCredentials();
    this.clientCredential.token = token.data.access_token;
    this.clientCredential.token_expires_in = token.data.expires_in;
    this.clientCredential.creationDate = new Date(Date.now());
    
    return this.clientCredential;
  }

  async getAccessToken(): Promise<string> {
    if (this.isExpired()) {
      await this.getCredentials();
    }
    return this.clientCredential.token;
  }



  private isExpired(): Boolean {
    if (this.clientCredential === null || this.clientCredential === undefined) {
      console.log('EXPIRED');
      return true;
    }

    const timeStampMillisecondsExpired =
      this.clientCredential.creationDate.getTime() + this.clientCredential.token_expires_in * 1000;      
    return timeStampMillisecondsExpired < Date.now();
  }
}
