import { ClientDatabase } from './client-database';
import { OAuthClientRepository } from './oauth-client.repository';
import { OAuthUserRepository } from './oauth-user.repository';

export class OAuthRepository {

  constructor(private readonly client: ClientDatabase) {
    this.client = client;
  }

  clients(): OAuthClientRepository {
    return new OAuthClientRepository(this.client);
  }

  users(): OAuthUserRepository {
    return new OAuthUserRepository(this.client);
  }
}
