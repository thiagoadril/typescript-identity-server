import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';

@Module({
  imports: [ConfigService],
})
export class ConfigModule {}
