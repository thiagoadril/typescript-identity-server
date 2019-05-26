import { DynamicModule, Global, Inject, Module, Provider } from '@nestjs/common';
import { defer } from 'rxjs';
import { getConnectionToken } from './common';
import { CassandraModuleAsyncOptions, CassandraModuleOptions, CassandraOptionsFactory } from './interfaces';
import { CASSANDRA_CONNECTION_NAME, CASSANDRA_MODULE_OPTIONS } from './cassandra.constants';
import { Client } from 'cassandra-driver';

@Global()
@Module({})
export class CassandraCoreModule {
  constructor(
    @Inject(CASSANDRA_CONNECTION_NAME)
    private readonly connectionName: string,
  ) {}

  static forRootAsync(options: CassandraModuleAsyncOptions): DynamicModule {
    const connName = getConnectionToken(options.connectionName);
    const cassandraConnectionNameProvider = {
      provide: CASSANDRA_CONNECTION_NAME,
      useValue: connName,
    };

    const connectionProvider = {
      provide: connName,
      useFactory: async (
        cassandraModuleOptions: CassandraModuleOptions,
      ): Promise<any> => {
        const client = new Client(cassandraModuleOptions);
        return await defer(async () => client).toPromise();
      },
      inject: [CASSANDRA_MODULE_OPTIONS],
    };
    return {
      module: CassandraCoreModule,
      imports: options.imports,
      providers: [
        ...this.buildAsyncProviders(options),
        connectionProvider,
        cassandraConnectionNameProvider,
      ],
      exports: [connectionProvider],
    };
  }

  private static buildAsyncProviders(
    options: CassandraModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.buildAsyncOptionsProvider(options)];
    }
    return [
      this.buildAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static buildAsyncOptionsProvider(
    options: CassandraModuleAsyncOptions,
  ): Provider {
    return {
      provide: CASSANDRA_MODULE_OPTIONS,
      useFactory: async (optionsFactory: CassandraOptionsFactory) =>
        await optionsFactory.buildCassandraOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
