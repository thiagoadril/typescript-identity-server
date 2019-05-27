import { types } from 'cassandra-driver';
import Uuid = types.Uuid;

export class OAuthClient {
  clientId: Uuid;
  clientSecret: string;
  userId: Uuid;
  name: string;
  trustedClient: boolean;
  created: number;
  updated: number;
}
