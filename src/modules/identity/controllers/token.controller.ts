import { Controller, Get, Post } from '@nestjs/common';
import { OAuthService } from '../services/oauth.service';
import { Observable } from 'rxjs';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Token')
@Controller('token')
export class TokenController {
  constructor(private readonly oauthService: OAuthService) {}

  /**
   * POST /token
   */
  @Post()
  tokenPost(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('token post');
      subscriber.complete();
    });
  }

  /**
   * GET /token/revoke
   */
  @Get('revoke')
  tokenRevokeGet(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('token revoke get');
      subscriber.complete();
    });
  }

  /**
   * GET /token/receive
   */
  @Get('receive')
  tokenReceiveGet(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('token receive get');
      subscriber.complete();
    });
  }
}
