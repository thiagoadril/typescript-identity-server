import { InjectConfig } from 'nestjs-config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {

  constructor(@InjectConfig() private readonly config) {
    this.config = config;
  }

  isProduction() {
    return this.config.get('app.env') === 'production';
  }
}
