import { Client } from 'cassandra-driver';
import { InjectConnection } from '../../../database/core/cassandra/common';

export class OAuthScopesRepository {
  constructor(@InjectConnection() private readonly client: Client) {}
}
