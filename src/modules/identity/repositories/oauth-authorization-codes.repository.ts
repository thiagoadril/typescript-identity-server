import { Client, types } from 'cassandra-driver';
import { InjectConnection } from '../../../database/core/cassandra/common';
import ResultSet = types.ResultSet;

export class OAuthAuthorizationCodesRepository {
  constructor(@InjectConnection() private readonly client: Client) {
  }

  /**
   * Find authorization code by token
   * @param token
   */
  find(token: string): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }

  /**
   * Save authorization code
   * @param code
   * @param clientID
   * @param redirectURI
   * @param userID
   * @param scope
   */
  save(code, clientID, redirectURI, userID, scope): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }

  /**
   *  Delete an authorization code
   * @param token
   */
  delete(token): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }

}
