import { Logger } from '@nestjs/common';
import { ConfigService } from '../../modules/config/config.service';

export default class CoreUtils {
  public static PrintConfigurations(configService: ConfigService) {
    /**
     * API
     */
    Logger.log(' * [Api] ------------------------------');
    for (const [key, value] of Object.entries(JSON.parse(JSON.stringify(configService.apiConfig)))) {
      Logger.log(` * ${String(key)}: ${String(value)}`);
    }

    Logger.log(' * [Database] -------------------------');

    /**
     * Database
     */
    for (const [key, value] of Object.entries(JSON.parse(JSON.stringify(configService.dbConfig)))) {
      Logger.log(` * ${String(key)}: ${String(value)}`);
    }
  }

}
