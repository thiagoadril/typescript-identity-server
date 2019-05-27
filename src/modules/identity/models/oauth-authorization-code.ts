import { types } from 'cassandra-driver';
import Uuid = types.Uuid;

export class OAuthAuthorizationCode {
  code: string;
  clientId: Uuid;
  userId: Uuid;
  redirectUri: string;
  scope: string;
  created: number;
  updated: number;
}
