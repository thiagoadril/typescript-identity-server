import { Client, types } from 'cassandra-driver';
import { InjectConnection } from '../../../database/cassandra/common';
import ResultSet = types.ResultSet;

export class OAuthClientRepository {
  constructor(@InjectConnection() private readonly client: Client) {}

  /**
   * Find client by id
   * @param clientId
   */
  find(clientId: string): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }

  /**
   * Save client
   * @param token
   * @param userId
   * @param clientId
   * @param scope
   */
  save(
    token: string,
    userId: string,
    clientId: string,
    scope: string,
  ): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }
}
