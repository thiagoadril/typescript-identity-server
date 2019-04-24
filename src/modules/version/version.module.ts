import { Module } from '@nestjs/common';
import { VersionController } from '../../controllers/version/version.controller';
import { VersionService } from '../../services/version/version.service';
import { ConfigService } from '../../services/config/config.service';

@Module({
  controllers: [VersionController],
  providers: [VersionService, ConfigService],
})
export class VersionModule {}
