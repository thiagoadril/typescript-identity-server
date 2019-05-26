import { Injectable } from '@nestjs/common';
import { OAuthClientRepository } from '../repositories/oauth-client.repository';
import { OAuthUserRepository } from '../repositories/oauth-user.repository';
import { OAuthAccessTokenRepository } from '../repositories/oauth-access-token.repository';
import { OAuthAuthorizationCodesRepository } from '../repositories/oauth-authorization-codes.repository';
import { OAuthRefreshTokensRepository } from '../repositories/oauth-refresh-tokens.repository';
import { PhotoDto } from '../../photo/photo.dto';
import { Observable } from 'rxjs';

@Injectable()
export class OAuthService {
  /**
   * Inject all oauth repositories
   * @param clients
   * @param users
   * @param accessTokens
   * @param refreshTokens
   * @param authorizationCodes
   */
  constructor(
    private readonly clients: OAuthClientRepository,
    private readonly users: OAuthUserRepository,
    private readonly accessTokens: OAuthAccessTokenRepository,
    private readonly refreshTokens: OAuthRefreshTokensRepository,
    private readonly authorizationCodes: OAuthAuthorizationCodesRepository,
  ) {}

  /**
   * all photos
   */
  get allPhotos(): Observable<PhotoDto[]> {
    return new Observable<PhotoDto[]>(subscriber => {
      subscriber.next([]);
      subscriber.complete();
    });
  }
}
