import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import { VersionDto } from '../../domain/dto/version/version-dto';

@Injectable()
export class VersionService {
  constructor(private readonly config: ConfigService) {
    this.config = config;
  }

  async getVersion(): Promise<VersionDto> {
    return await new VersionDto(
      this.config.apiConfig.name,
      this.config.apiConfig.version,
    );
  }
}
