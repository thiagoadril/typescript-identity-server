import { Body, Controller, HttpCode, HttpStatus, Post, Res, UnauthorizedException, UsePipes } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ValidationEntityPipe } from '../../../core/pipes/ValidationEntityPipe';
import { UserCreateDto } from '../dtos/account/user-create.dto';
import { createHttpExceptionBody } from '@nestjs/common/utils/http-exception-body.util';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly authService: AuthService) {}

  /**
   * GET /account
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  @UsePipes(new ValidationEntityPipe())
  authPost(@Body() u: UserCreateDto, @Res() res): Observable<any> {
    return new Observable<any>(subscriber => {
      this.authService.existsUsername(u.username).subscribe(value => {
        console.log('value', value);
        if (value) {
          /*subscriber.next({
            user: 'found',
          });
          */
          const error = createHttpExceptionBody(
            `user ${u.username} found`,
            'user_found',
            401,
          );

          // res.json(error);
          // res.sendStatus(401);

          // subscriber.next(new UnauthorizedException());
          throw new UnauthorizedException('fail');
          subscriber.complete();
        } else {
          this.authService.save(u).subscribe(objSaved => {
            subscriber.next(objSaved);
            subscriber.complete();
          });
        }
      });
    });
  }
}
