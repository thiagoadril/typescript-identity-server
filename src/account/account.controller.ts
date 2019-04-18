import { Controller, Get } from '@nestjs/common';

@Controller('account')
export class AccountController {
  @Get()
  async index(): Promise<string> {
    return await 'account index';
  }
}
