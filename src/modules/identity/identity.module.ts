import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { OAuthService } from './services/oauth.service';
import { OAuthClientRepository } from './repositories/oauth-client.repository';
import { OAuthUserRepository } from './repositories/oauth-user.repository';
import { OAuthAccessTokenRepository } from './repositories/oauth-access-token.repository';
import { OAuthRefreshTokensRepository } from './repositories/oauth-refresh-tokens.repository';
import { OAuthAuthorizationCodesRepository } from './repositories/oauth-authorization-codes.repository';
import { AuthorizeController } from './controllers/authorize.controller';
import { TokenController } from './controllers/token.controller';
import { InfoController } from './controllers/info.controller';
import { AuthService } from './services/auth.service';
import { AccountController } from './controllers/account.controller';

@Module({
  imports: [],
  controllers: [
    AccountController,
    AuthController,
    AuthorizeController,
    TokenController,
    InfoController,
  ],
  providers: [
    OAuthClientRepository,
    OAuthUserRepository,
    OAuthAccessTokenRepository,
    OAuthRefreshTokensRepository,
    OAuthAuthorizationCodesRepository,
    OAuthService,
    AuthService,
  ],
})
export class IdentityModule {}
