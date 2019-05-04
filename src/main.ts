import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from './modules/config/config.service';
import { Logger } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import CoreUtils from './core/utils/core-utils';
import portFinder = require('portfinder');

/**
 * Bootstrap Application
 */
async function bootstrap() {
  const configService = new ConfigService();
  await portFinder.getPort({
    port: configService.apiConfig.port,    // minimum port
    stopPort: configService.apiConfig.port, // maximum port
  }, (err, port) => {
    if (!err) {
      return buildServer(configService);
    } else {
      Logger.error(
        `API not started, port ${configService.apiConfig.port} in use.`,
        null, 'Port');
    }
  });
}

async function buildServer(configService: ConfigService) {
  /**
   * Configuration Fields
   */
  const name: string = configService.apiConfig.name;
  const enableAuth: boolean = configService.apiConfig.authEnable;
  const env: string = configService.apiConfig.environment;
  const port: number = configService.apiConfig.port;
  const enableCors: boolean = configService.apiConfig.corsEnable;

  /**
   * Start Application Listen
   */
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);

  // Enable CORS
  if (enableCors) {
    app.enableCors();
  }

  await app.listen(port);

  /**
   * Create Logger Config
   */
  Logger.log('', ' Configuration (Start) ');

  /**
   * Print Configurations
   */
  CoreUtils.PrintConfigurations(configService);

  Logger.log('\n', ' Configuration (End) ');
  Logger.log(`${name} on port: ${String(port)}`, 'API');
}

/**
 * Initialize Application
 */
bootstrap()
  .catch(e => {
    Logger.error(String(e));
  });
