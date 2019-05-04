import { InjectConnection } from '../../database/core/cassandra/common';
import { Client, types } from 'cassandra-driver';

export class PhotoRepository {
  constructor(@InjectConnection() private readonly client: Client) {
  }

  get all(): Promise<types.ResultSet> {
    return this.client.execute('SELECT id, name FROM photo');
  }
}
