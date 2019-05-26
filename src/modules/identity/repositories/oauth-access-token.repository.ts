import { Client, types } from 'cassandra-driver';
import { InjectConnection } from '../../../database/core/cassandra/common';
import ResultSet = types.ResultSet;

export class OAuthAccessTokenRepository {
  constructor(@InjectConnection() private readonly client: Client) {}

  /**
   * Find access token
   * @param token
   */
  find(token: string): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }

  /**
   * Save access token
   * @param token
   * @param expirationDate
   * @param userID
   * @param clientID
   * @param scope
   */
  save(token, expirationDate, userID, clientID, scope): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }

  /**
   * Delete access token
   * @param token
   */
  delete(token): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }

  /**
   * Remove expired access token
   */
  removeExpired(): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }

  /**
   * Remove all access token
   */
  removeAll(): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }
}
