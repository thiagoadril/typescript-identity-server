import { Controller, Get, Post, HttpStatus, Res } from '@nestjs/common';
import { OAuthService } from '../services/oauth.service';
import { ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiUseTags('Token')
@Controller('token')
export class TokenController {
  constructor(private readonly oauthService: OAuthService) {}

  /**
   * POST /token
   */
  @Post()
  async tokenPost(@Res() res: Response): Promise<string> {
    return await new Promise<string>(() => {
      res.status(HttpStatus.OK).send({ message: 'token post' });
    });
  }

  /**
   * GET /token/revoke
   */
  @Get('revoke')
  async tokenRevokeGet(@Res() res: Response): Promise<string> {
    return await new Promise<string>(() => {
      res.status(HttpStatus.OK).send({ message: 'token revoke get' });
    });
  }

  /**
   * GET /token/receive
   */
  @Get('receive')
  async tokenReceiveGet(@Res() res: Response): Promise<string> {
    return await new Promise<string>(() => {
      res.status(HttpStatus.OK).send({ message: 'token receive get' });
    });
  }
}
