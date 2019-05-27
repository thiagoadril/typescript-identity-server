import { Client } from 'cassandra-driver';
import { InjectConnection } from '../../../database/cassandra/common';

export class OAuthJwtsRepository {
  constructor(@InjectConnection() private readonly client: Client) {}
}
