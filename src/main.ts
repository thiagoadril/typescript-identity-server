import { NestFactory } from '@nestjs/core';
import { AppModule } from './core/app/app.module';
import { LoaderService } from './core/loader/loader.service';
import { Logger } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import CoreUtils from './core/utils/core-utils';
import portFinder = require('portfinder');

/**
 * Bootstrap Application
 */
async function bootstrap() {
  const configService = new LoaderService();
  await portFinder.getPort(
    {
      port: configService.apiConfig.port, // minimum port
      stopPort: configService.apiConfig.port, // maximum port
    },
    (err, port) => {
      if (!err) {
        return buildServer(configService);
      } else {
        Logger.error(
          `API not started, port ${configService.apiConfig.port} in use.`,
          null,
          'Port',
        );
      }
    },
  );
}

async function buildServer(configService: LoaderService) {
  /**
   * Configuration Fields
   */
  const name: string = configService.apiConfig.name;
  const port: number = configService.apiConfig.port;
  const enableCors: boolean = configService.apiConfig.corsEnable;
  const swaggerTitle: string = configService.swaggerConfig.swaggerTitle;
  const swaggerDesc: string = configService.swaggerConfig.swaggerDescription;
  const swaggerVersion: string = configService.swaggerConfig.swaggerVersion;
  const swaggerPath: string = configService.swaggerConfig.swaggerPath;

  /**
   * Start Application Listen
   */
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  /**
   * Docs Configuration
   */
  const docsOptions = new DocumentBuilder()
    .setTitle(swaggerTitle)
    .setDescription(swaggerDesc)
    .setVersion(swaggerVersion)
    .build();

  const document = SwaggerModule.createDocument(app, docsOptions);

  SwaggerModule.setup(swaggerPath, app, document);

  /**
   * Cors Configuration
   */
  if (enableCors) {
    app.enableCors();
  }

  /**
   * Start Listen
   */
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
bootstrap().catch(e => {
  Logger.error(String(e));
});
