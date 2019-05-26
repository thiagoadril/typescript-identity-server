import { Controller, Get, Post } from '@nestjs/common';
import { OAuthService } from '../services/oauth.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly oauthService: OAuthService,
  ) {}

  /**
   * GET /identity
   */
  @Get()
  authGet(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('identity get');
      subscriber.complete();
    });
  }

  /**  * POST /identity
   */
  @Post()
  authPost(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('identity post');
      subscriber.complete();
    });
  }

  /**
   * GET /identity/logout
   */
  @Get('logout')
  authLogoutGet(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('identity logout get');
      subscriber.complete();
    });
  }
}
