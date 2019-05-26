import { Controller, Get, Post } from '@nestjs/common';
import { Observable } from 'rxjs';
import { OAuthService } from '../services/oauth.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Authorize')
@Controller('authorize')
export class AuthorizeController {
  constructor(private readonly oauthService: OAuthService) {}

  /**
   * GET /authorize
   */
  @Get()
  authorizeGet(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('authorize get');
      subscriber.complete();
    });
  }

  /**
   * POST /authorize
   */
  @Post()
  authorizePost(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('authorize post');
      subscriber.complete();
    });
  }
}
