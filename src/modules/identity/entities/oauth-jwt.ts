import { types } from 'cassandra-driver';
import Uuid = types.Uuid;

export class OAuthJwt {
  clientId: Uuid;
  subject: string;
  publicKey: string;
  created: number;
  updated: number;
}
