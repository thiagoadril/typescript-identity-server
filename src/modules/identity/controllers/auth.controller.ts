import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Body,
  Param,
  UsePipes,
  Query,
} from '@nestjs/common';
import { OAuthService } from '../services/oauth.service';
import { AuthService } from '../services/auth.service';
import { ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';
import { UserCreateDto } from '../dtos/account/user-create.dto';
import { UserAuthDto } from '../dtos/auth/user-auth.dto';
import { createHttpExceptionBody } from '@nestjs/common/utils/http-exception-body.util';
import { ValidationEntityPipe } from '../../../core/pipes/ValidationEntityPipe';

@ApiUseTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly oauthService: OAuthService,
  ) {}

  /**
   * GET /identity
   */
  @Post()
  @UsePipes(new ValidationEntityPipe())
  async authPost(
    @Query() userAuth: UserAuthDto,
    @Res() res: Response,
  ): Promise<UserCreateDto> {
    return new Promise<any>(async () => {
      this.authService
        .hasUsername(userAuth.username)
        .then(found => {
          if (!found) {
            res
              .status(HttpStatus.UNAUTHORIZED)
              .send(
                createHttpExceptionBody(
                  `invalid credentials`,
                  'unauthorized',
                  HttpStatus.UNAUTHORIZED,
                ),
              );
          } else {
            this.authService
              .authenticate(userAuth.username, userAuth.password)
              .then(valid => {
                if (!valid) {
                  res
                    .status(HttpStatus.UNAUTHORIZED)
                    .send(
                      createHttpExceptionBody(
                        `invalid credentials`,
                        'unauthorized',
                        HttpStatus.UNAUTHORIZED,
                      ),
                    );
                } else {
                  res.status(HttpStatus.OK).send(userAuth);
                }
              });
          }
        })
        .catch(err => {
          res
            .status(HttpStatus.BAD_REQUEST)
            .send(
              createHttpExceptionBody(err, 'failure', HttpStatus.BAD_REQUEST),
            );
        });
    }).catch(err => {
      res
        .status(HttpStatus.BAD_REQUEST)
        .send(createHttpExceptionBody(err, 'failure', HttpStatus.BAD_REQUEST));
    });
  }

  /**
   * GET /identity/logout
   */
  @Get('logout')
  async authLogoutGet(@Res() res: Response): Promise<string> {
    return await new Promise<string>(() => {
      res.status(HttpStatus.OK).send({ message: 'identity logout' });
    });
  }
}
