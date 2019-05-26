import { types } from 'cassandra-driver';
import Uuid = types.Uuid;

export class OAuthUser {
  id: Uuid;
  name: string;
  username: string;
  password: string;
  verified: boolean;
  created: number;
  updated: number;

  constructor(name: string, username: string, password: string) {
    this.id = Uuid.random();
    this.name = name;
    this.username = username;
    this.password = password;
    this.verified = false;
    this.created = new Date().getTime();
    // this.updated = new Date().getTime();
  }
}
