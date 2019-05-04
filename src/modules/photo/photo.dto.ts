import { types } from 'cassandra-driver';
import Uuid = types.Uuid;

export class PhotoDto {
  id: Uuid;
  name: string;

  constructor(id: types.Uuid, name: string) {
    this.id = id;
    this.name = name;
  }
}
