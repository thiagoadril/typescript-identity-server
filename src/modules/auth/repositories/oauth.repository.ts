import { OAuthClientRepository } from './oauth-client.repository';
import { OAuthUserRepository } from './oauth-user.repository';
import { Client } from 'cassandra-driver';

export class OAuthRepository {

  constructor(private readonly client: Client) {
    this.client = client;
  }

  clients(): OAuthClientRepository {
    return new OAuthClientRepository(this.client);
  }

  users(): OAuthUserRepository {
    return new OAuthUserRepository(this.client);
  }
}
