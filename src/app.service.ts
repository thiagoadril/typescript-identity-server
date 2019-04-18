import { Injectable, OnModuleInit, OnApplicationShutdown, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { AppInfoDto } from './base/app-info-dto';

@Injectable()
export class AppService implements OnApplicationBootstrap, OnModuleInit, OnApplicationShutdown {
  getVersionInfo(): AppInfoDto {
    return new AppInfoDto('mercurius',
      '1.1.0',
      'online');
  }

  onApplicationShutdown(signal?: string): any {
    Logger.log(
      'Application shutdown by signal: '
      .concat(signal),
      'onApplicationShutdown',
      true,
    );
  }

  onApplicationBootstrap(): any {
    Logger.log(
      'Bootstrap initialized...',
      'onApplicationBootstrap',
      true,
    );
  }

  onModuleInit(): any {
    Logger.log(
      'Module initialized...',
      'onModuleInit',
      true,
    );
  }
}
