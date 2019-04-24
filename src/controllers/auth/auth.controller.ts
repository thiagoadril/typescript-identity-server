import { Controller, Get } from '@nestjs/common';

@Controller()
export class AuthController {
  @Get('token')
  async index(): Promise<object> {
    return {
      message: 'authentication index',
    };
  }
}
