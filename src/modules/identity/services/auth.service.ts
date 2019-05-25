import { Injectable } from '@nestjs/common';
import { OAuthUserRepository } from '../repositories/oauth-user.repository';
import { Observable } from 'rxjs';
import { OAuthUser } from '../entities/oauth-user';

@Injectable()
export class AuthService {
  constructor(private readonly users: OAuthUserRepository) {
  }

  save(name: string, username: string, password: string): Observable<OAuthUser> {
    return new Observable(subscriber => {
      const user = new OAuthUser(name, username, password);
      this.users
        .save(user)
        .then(value => {
          user.id = value.rows[0].id;
          subscriber.next(user);
        }).catch(reason => {
        subscriber.error(reason);
      }).finally(() => {
        subscriber.complete();
      });
    });
  }
}
