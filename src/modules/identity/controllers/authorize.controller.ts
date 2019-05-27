import { Controller, Get, Post, HttpStatus, Res } from '@nestjs/common';
import { Response } from 'express';
import { OAuthService } from '../services/oauth.service';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('Authorize')
@Controller('authorize')
export class AuthorizeController {
  constructor(private readonly oauthService: OAuthService) {}

  /**
   * GET /authorize
   */
  @Get()
  async authorizeGet(@Res() res: Response): Promise<string> {
    return await new Promise<string>(() => {
      res.status(HttpStatus.OK).send({ message: 'authorize get' });
    });
  }

  /**
   * POST /authorize
   */
  @Post()
  async authorizePost(@Res() res: Response): Promise<string> {
    return await new Promise<string>(() => {
      res.status(HttpStatus.OK).send({ message: 'authorize post' });
    });
  }
}
