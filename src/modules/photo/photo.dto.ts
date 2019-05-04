import { types } from 'cassandra-driver';
import Uuid = types.Uuid;

export class PhotoDto {
  id: Uuid;
  name: string;
  date: Date;

  constructor(id: types.Uuid, name: string, date: Date = null) {
    this.id = id;
    this.name = name;
    this.date = date;
  }
}
