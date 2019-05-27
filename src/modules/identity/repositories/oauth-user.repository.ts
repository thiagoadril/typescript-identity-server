import { Client, types } from 'cassandra-driver';
import { InjectConnection } from '../../../database/cassandra/common';
import { OAuthUser } from '../models/oauth-user';
import ResultSet = types.ResultSet;

export class OAuthUserRepository {
  constructor(@InjectConnection() private readonly client: Client) {}

  /**
   * Find user by id
   * @param userId
   */
  find(userId: string): Promise<ResultSet> {
    const query = 'SELECT * FROM oauth_users WHERE user_id=?';
    return this.client.execute(query, [userId], {
      prepare: true,
    });
  }

  /**
   * Find user by username
   * @param username
   */
  findByUsername(username: string): Promise<ResultSet> {
    const query =
      'SELECT user_id, name, username, verified FROM oauth_users WHERE username=?';
    return this.client.execute(query, [username], {
      prepare: true,
    });
  }

  /**
   * Found credentials
   * @param username
   */
  findCredendialsByUsername(username: string): Promise<ResultSet> {
    const query = 'SELECT username, password FROM oauth_users WHERE username=?';
    return this.client.execute(query, [username], {
      prepare: true,
    });
  }

  /**
   * Save user
   * @param user
   */
  save(user: OAuthUser): Promise<ResultSet> {
    const query =
      '' +
      'INSERT INTO oauth_users ' +
      '(user_id, name, password, username, verified, created, updated) ' +
      'VALUES (?, ?, ?, ?, ?, ?, ?);';

    return this.client.execute(
      query,
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
