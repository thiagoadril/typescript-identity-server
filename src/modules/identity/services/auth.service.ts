import { Injectable } from '@nestjs/common';
import { OAuthUserRepository } from '../repositories/oauth-user.repository';
import { Observable } from 'rxjs';
import { OAuthUser } from '../entities/oauth-user';
import { UserCreateDto } from '../dtos/account/user-create.dto';

@Injectable()
export class AuthService {
  constructor(private readonly users: OAuthUserRepository) {}

  existsUsername(username: string): Observable<boolean> {
    return new Observable(subscriber => {
      this.users.findByUsername(username).then(value => {
        console.log(value);
        if (value.rows.length > 0) {
          subscriber.next(true);
        } else {
          subscriber.next(false);
        }
        subscriber.complete();
      });
    });
  }

  /**
   * Save user by UserCreateDto
   * @param u
   */
  save(u: UserCreateDto): Observable<OAuthUser> {
    return new Observable(subscriber => {
      const user = new OAuthUser(u.name, u.username, u.password);
      this.users
        .save(user)
        .then(value => {
          if (value.wasApplied()) {
            subscriber.next(user);
          } else {
            subscriber.error('failure save');
          }
        })
        .catch(reason => {
          subscriber.error(reason);
        })
        .finally(() => {
          subscriber.complete();
        });
    });
  }
}
