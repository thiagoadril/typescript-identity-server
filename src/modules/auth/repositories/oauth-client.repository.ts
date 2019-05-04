import { ClientDatabase } from './client-database';
import { OAuthClient } from '../entities/oauth-client';

export class OAuthClientRepository {
  constructor(private readonly client: ClientDatabase) {
  }

  find(clientId: string): OAuthClient {
    return this.client.execute('QUERY_SQL') as OAuthClient;
  }

  save(token: string, userId: string, clientId: string, scope: string): OAuthClient {
    return this.client.execute('QUERY_SQL') as OAuthClient;
  }
}
