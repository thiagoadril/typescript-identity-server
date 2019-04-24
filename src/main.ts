import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { ConfigService } from './services/config/config.service';
import { Logger } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import CoreUtils from './core/utils/core-utils';
import portFinder = require('portfinder');

/**
 * Bootstrap Application
 */
async function bootstrap() {
  const cfg = new ConfigService();
  await portFinder.getPort({
    port: cfg.apiConfig.port,    // minimum port
    stopPort: cfg.apiConfig.port, // maximum port
  }, (err, port) => {
    if (!err) {
      return buildServer(cfg);
    } else {
      Logger.error(`API not started, port ${cfg.apiConfig.port} in use.`, null, 'Port');
    }
  });
}

async function buildServer(cfg: ConfigService) {
  /**
   * Configuration Fields
   */
  const name: string = cfg.apiConfig.name;
  const enableAuth: boolean = cfg.apiConfig.authEnable;
  const env: string = cfg.apiConfig.environment;
  const port: number = cfg.apiConfig.port;
  const enableCors: boolean = cfg.apiConfig.corsEnable;

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
  CoreUtils.PrintApiConfiguration(cfg.apiConfig);

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
