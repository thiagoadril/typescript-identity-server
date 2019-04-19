import { Injectable, OnModuleInit, OnApplicationShutdown, Logger, OnApplicationBootstrap } from '@nestjs/common';

@Injectable()
export class AppService implements OnApplicationBootstrap, OnModuleInit, OnApplicationShutdown {
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
