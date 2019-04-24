import { ApiConfig } from '../config/entities/api-config';
import { Logger } from '@nestjs/common';

export default class CoreUtils {
  public static PrintApiConfiguration(apiConfig: ApiConfig) {
    const cObj = JSON.parse(JSON.stringify(apiConfig));
    for (const [key, value] of Object.entries(cObj)) {
      Logger.log(` * ${String(key)}: ${String(value)}`);
    }
  }
}
