import { Client, types } from 'cassandra-driver';
import { InjectConnection } from '../../../database/core/cassandra/common';
import ResultSet = types.ResultSet;

export class OAuthRefreshTokensRepository {
  constructor(@InjectConnection() private readonly client: Client) {
  }

  /**
   * Find refresh token
   * @param token
   */
  find(token): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }

  /**
   * Save refresh token
   * @param token
   * @param userID
   * @param clientID
   * @param scope
   */
  save(token, userID, clientID, scope): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }

  /**
   * Delete refresh token
   * @param token
   */
  delete(token): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }

  /**
   * Remove all refresh tokens
   */
  removeAll(): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }
}
