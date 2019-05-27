import { types } from 'cassandra-driver';
import Uuid = types.Uuid;
import TimeUuidStatic = types.TimeUuidStatic;

export class OAuthRefreshToken {
  refreshToken: string;
  clientId: Uuid = Uuid.random();
  userId: Uuid;
  scope: string;
  created: number;
  updated: number;
}
