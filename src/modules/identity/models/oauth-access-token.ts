import { types } from 'cassandra-driver';
import Uuid = types.Uuid;

export class OAuthAccessToken {
  accessToken: string;
  clientId: Uuid;
  userId: Uuid;
  expires: number;
  scope: string;
  created: number;
  updated: number;
}
