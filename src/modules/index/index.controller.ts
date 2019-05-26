import { Controller, Get } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Home')
@Controller()
export class IndexController {
  /**
   * GET /
   */
  @Get()
  index(): Observable<object> {
    return new Observable(subscriber => {
      subscriber.next(
        /*
      [
        {
          type: 'get', path: 'identity',
        },
        {
          type: 'post', path: 'identity',
        },
        {
          type: 'get', path: 'identity/logout',
        },
        {
          type: 'get', path: 'authorize',
        },
        {
          type: 'post', path: 'authorize',
        },
        {
          type: 'post', path: 'token',
        },
        {
          type: 'get', path: 'token/revoke',
        },
        {
          type: 'get', path: 'token/receive',
        },
        {
          type: 'get', path: 'info',
        },
        {
          type: 'get', path: 'info/sso',
        },
        {
          type: 'get', path: 'info/user',
        },
        {
          type: 'get', path: 'info/client',
        }, {
          type: 'get', path: 'info/token',
        }]*/
        { message: 'welcome to api identity 2' },
      );
      subscriber.complete();
    });
  }
}
