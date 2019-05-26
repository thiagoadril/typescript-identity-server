import { Controller, Get } from '@nestjs/common';
import { OAuthService } from '../services/oauth.service';
import { Observable } from 'rxjs';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Info')
@Controller('info')
export class InfoController {
  constructor(private readonly oauthService: OAuthService) {}

  /**
   * GET /info/sso
   */
  @Get('sso')
  infoSSOGet(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('info sso get');
      subscriber.complete();
    });
  }

  /**
   * GET /info/sso
   */
  @Get('user')
  infoUserGet(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('info user get');
      subscriber.complete();
    });
  }

  /**
   * GET /info/client
   */
  @Get('client')
  infoClientGet(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('info client get');
      subscriber.complete();
    });
  }

  /**
   * GET /info/client
   */
  @Get('token')
  infoTokenGet(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('info token get');
      subscriber.complete();
    });
  }
}
