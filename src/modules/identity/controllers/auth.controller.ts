import { Controller, Get, Post } from '@nestjs/common';
import { OAuthService } from '../services/oauth.service';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly oauthService: OAuthService) {
  }

  /**
   * GET /auth/new
   */
  @Get()
  authNewGet(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('auth get');
      subscriber.complete();
    });
  }

  /**
   * GET /auth
   */
  @Get()
  authGet(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('auth get');
      subscriber.complete();
    });
  }

  /**  * POST /auth
   */
  @Post()
  authPost(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('auth post');
      subscriber.complete();
    });
  }

  /**
   * GET /auth/logout
   */
  @Get('logout')
  authLogoutGet(): Observable<string> {
    return new Observable(subscriber => {
      subscriber.next('auth logout get');
      subscriber.complete();
    });
  }
}
