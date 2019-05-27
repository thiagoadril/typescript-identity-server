import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
import { Response } from 'express';
import { LoaderService } from '../../core/loader/loader.service';

@ApiUseTags('Home')
@Controller()
export class IndexController {
  constructor(private loaderService: LoaderService) {}
  /**
   * GET /
   */
  @Get()
  async index(@Res() res: Response): Promise<string> {
    return await new Promise<string>(() => {
      res
        .status(HttpStatus.OK)
        .json({ message: `Welcome to ${this.loaderService.apiConfig.name}` });
    });
  }
}
