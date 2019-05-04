import { ClientDatabase } from './client-database';
import { OAuthUser } from '../entities/oauth-user';

export class OAuthUserRepository {
  constructor(private readonly client: ClientDatabase) {
  }

  find(clientId: string): OAuthUser {
    return this.client.execute('QUERY_SQL') as OAuthUser;
  }

  findByUsername(username: string): OAuthUser {
    return this.client.execute('QUERY_SQL') as OAuthUser;
  }

  save(token: string, userId: string, clientId: string, scope: string): OAuthUser {
    return this.client.execute('QUERY_SQL') as OAuthUser;
  }
}
