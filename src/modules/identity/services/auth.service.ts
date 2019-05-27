import { Injectable } from '@nestjs/common';
import { OAuthUserRepository } from '../repositories/oauth-user.repository';
import { OAuthUser } from '../models/oauth-user';
import { UserCreateDto } from '../dtos/account/user-create.dto';
import { CryptoService } from './crypto.service';
import { types } from 'cassandra-driver';
import Row = types.Row;

@Injectable()
export class AuthService {
  constructor(
    private readonly users: OAuthUserRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  hasUsername(username: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.users
        .findByUsername(username)
        .then(value => {
          resolve(value.rows.length > 0 ? true : false);
        })
        .catch(error => reject(error));
    });
  }

  authenticate(username: string, password: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.users
        .findCredendialsByUsername(username)
        .then(value => {
          const row = value.first();
          if (row === null) {
            return resolve(false);
          }

          if (row !== null) {
            this.cryptoService
              .compare(password, row.password)
              .then(valid => {
                resolve(valid ? true : false);
              })
              .catch(error => reject(error));
          } else {
            resolve(false);
          }
        })
        .catch(error => reject(error));
    });
  }

  /**
   * Save user by UserCreateDto
   * @param u
   */
  save(u: UserCreateDto): Promise<OAuthUser> {
    return new Promise<OAuthUser>((resolve, reject) => {
      this.cryptoService
        .build(u.password)
        .then(pwd => {
          const user = new OAuthUser(u.name, u.username, pwd.hash);
          this.users
            .save(user)
            .then(saved => {
              saved.wasApplied() ? resolve(user) : reject();
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
