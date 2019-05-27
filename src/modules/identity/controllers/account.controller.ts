import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  Res,
} from '@nestjs/common';

import { Response } from 'express';
import { AuthService } from '../services/auth.service';
import { ValidationEntityPipe } from '../../../core/pipes/ValidationEntityPipe';
import { UserCreateDto } from '../dtos/account/user-create.dto';
import { createHttpExceptionBody } from '@nestjs/common/utils/http-exception-body.util';
import { ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiUseTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly authService: AuthService) {}

  /**
   * GET /account
   */
  @ApiOperation({ title: 'Create user account' })
  @ApiResponse({
    status: 201,
    description: 'The user account successfully created.',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @HttpCode(HttpStatus.UNAUTHORIZED)
  @UsePipes(new ValidationEntityPipe())
  async accountPost(
    @Body() userCreate: UserCreateDto,
    @Res() res: Response,
  ): Promise<any> {
    return new Promise<any>(async () => {
      this.authService.hasUsername(userCreate.username).then(found => {
        if (found) {
          res
            .status(HttpStatus.UNAUTHORIZED)
            .send(
              createHttpExceptionBody(
                `user account ${userCreate.username} found`,
                'user_found',
                HttpStatus.UNAUTHORIZED,
              ),
            );
        } else {
          this.authService.save(userCreate).then(saved => {
            res.status(HttpStatus.CREATED).send({
              message: `user account ${saved.username} created`,
            });
          });
        }
      });
    });
  }
}
