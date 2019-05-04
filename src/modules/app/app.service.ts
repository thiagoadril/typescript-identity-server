import { Injectable, Logger, OnApplicationBootstrap, OnApplicationShutdown, OnModuleInit } from '@nestjs/common';

@Injectable()
export class AppService implements OnApplicationBootstrap, OnModuleInit, OnApplicationShutdown {
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

  onApplicationShutdown(signal?: string): any {
    Logger.log(
      'Application shutdown by signal: '
        .concat(signal),
      'onApplicationShutdown',
      true,
    );
  }
}
