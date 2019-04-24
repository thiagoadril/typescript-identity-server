import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from '../../services/config/config.service';

@Injectable()
export class HeaderMiddleware implements NestMiddleware {
  constructor(private readonly config: ConfigService) {}

  use(req: Request, res: Response, next: () => void) {
    res.removeHeader('X-Powered-By');
    next();
  }
}
