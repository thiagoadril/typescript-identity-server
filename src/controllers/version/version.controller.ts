import { Controller, Get } from '@nestjs/common';
import { VersionService } from '../../services/version/version.service';
import { VersionDto } from '../../domain/dto/version/version-dto';

@Controller('version')
export class VersionController {
  constructor(private readonly versionService: VersionService) {
    this.versionService = versionService;
  }

  @Get()
  async index(): Promise<VersionDto> {
    return await this.versionService.getVersion();
  }
}
