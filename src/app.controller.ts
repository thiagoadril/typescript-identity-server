import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppInfoDto } from './base/app-info-dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async index(): Promise<AppInfoDto> {
    return await this.appService.getVersionInfo();
  }
}
