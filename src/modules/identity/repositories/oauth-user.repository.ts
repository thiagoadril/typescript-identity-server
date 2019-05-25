import { Client, types } from 'cassandra-driver';
import { InjectConnection } from '../../../database/core/cassandra/common';
import ResultSet = types.ResultSet;
import { OAuthUser } from '../entities/oauth-user';

export class OAuthUserRepository {
  constructor(@InjectConnection() private readonly client: Client) {
  }

  /**
   * Find user by id
   * @param userId
   */
  find(userId: string): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }

  /**
   * Find user by username
   * @param username
   */
  findByUsername(username: string): Promise<ResultSet> {
    return this.client.execute('QUERY_SQL');
  }

  /**
   * Save user
   * @param user
   */
  save(user: OAuthUser): Promise<ResultSet> {
    const query = '' +
      'INSERT INTO oauth_users ' +
      '(user_id, name, password, username, verified, created, updated) ' +
      'VALUES (?, ?, ?, ?, ?, ?, ?);';

    return this.client.execute(query,
      [
        user.id,
        user.name,
        user.password,
        user.username,
        user.verified,
        user.created,
        user.updated,
      ],
      {
        prepare: true,
      },
    );
  }
}
