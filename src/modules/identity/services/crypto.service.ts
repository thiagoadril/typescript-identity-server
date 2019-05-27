import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export interface DataResultHash {
  hash: string;
  salt: string;
}

@Injectable()
export class CryptoService {
  /**
   * generates random string of characters i.e salt
   * @function
   * @param {number} length - Length of the random string.
   */

  build(password: string): Promise<DataResultHash> {
    return new Promise<DataResultHash>((resolve, reject) => {
      bcrypt
        .genSalt()
        .then(salt => {
          bcrypt
            .hash(password, salt)
            .then(hash => {
              const res: DataResultHash = {
                hash,
                salt,
              };
              resolve(res);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  }

  compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
