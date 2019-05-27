import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { OAuthService } from '../services/oauth.service';
import { ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiUseTags('Info')
@Controller('info')
export class InfoController {
  constructor(private readonly oauthService: OAuthService) {}

  /**
   * GET /info/sso
   */
  @Get('sso')
  async infoSSOGet(@Res() res: Response): Promise<string> {
    return await new Promise<string>(() => {
      res.status(HttpStatus.OK).send({ message: 'info sso get' });
    });
  }

  /**
   * GET /info/user
   */
  @Get('user')
  async infoUserGet(@Res() res: Response): Promise<string> {
    return await new Promise<string>(() => {
      res.status(HttpStatus.OK).send({ message: 'info user get' });
    });
  }

  /**
   * GET /info/client
   */
  @Get('client')
  async infoClientGet(@Res() res: Response): Promise<string> {
    return await new Promise<string>(() => {
      res.status(HttpStatus.OK).send({ message: 'info client get' });
    });
  }

  /**
   * GET /info/token
   */
  @Get('token')
  async infoTokenGet(@Res() res: Response): Promise<string> {
    return await new Promise<string>(() => {
      res.status(HttpStatus.OK).send({ message: 'info token get' });
    });
  }
}
