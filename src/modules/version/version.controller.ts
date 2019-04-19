import { Controller, Get, Logger } from '@nestjs/common';
import { VersionService } from './version.service';
import { VersionDto } from './dto/version-dto';
import { ConfigParam, Configurable } from 'nestjs-config';
import {ConfigService} from 'nestjs-config';

@Controller('version')
export class VersionController {

  constructor(private readonly config: ConfigService, private readonly versionService: VersionService) {
    this.config = config;
  }

  @Get()
  @Configurable()
  async index(@ConfigParam('app.env') live): Promise<VersionDto> {
    Logger.log('version env' + this.config.get('app.env'));
    return await this.versionService.CreateVersion(
      'Merx',
      '1.0',
      new Date(2019, 4, 18),
      new Date(2019, 4, 18));
  }
}
