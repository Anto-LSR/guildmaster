import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ClientCredentials } from 'src/Client-credentials';

@Injectable()
export class GetTokenService {
  constructor(private readonly httpService: HttpService) {
    this.getCredentials();
  }
  clientCredential: ClientCredentials;

  async getCredentials(): Promise<ClientCredentials> {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const qs = require('qs');
    const data = qs.stringify({
      grant_type: 'client_credentials',
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
    const token = await this.httpService.axiosRef.request(config);
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
    console.log('APP_TOKEN : ', this.clientCredential.token);
    return this.clientCredential.token;
  }

  private isExpired(): boolean {
    if (this.clientCredential === null || this.clientCredential === undefined) {
      console.log('EXPIRED');
      return true;
    }

    const timeStampMillisecondsExpired =
      this.clientCredential.creationDate.getTime() +
      this.clientCredential.token_expires_in * 1000;
    return timeStampMillisecondsExpired < Date.now();
  }
}
