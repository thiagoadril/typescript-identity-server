import { DynamicModule, Global, Inject, Logger, Module, Provider } from '@nestjs/common';
import { defer } from 'rxjs';
import { getConnectionToken } from './common/cassandra.utils';
import { CassandraModuleAsyncOptions, CassandraModuleOptions, CassandraOptionsFactory } from './interfaces/cassandra.options.interface';
import { CASSANDRA_CONNECTION_NAME, CASSANDRA_MODULE_OPTIONS } from './cassandra.constants';
import { Client } from 'cassandra-driver';

@Global()
@Module({})
export class CassandraCoreModule {
  constructor(@Inject(CASSANDRA_CONNECTION_NAME)
              private readonly connectionName: string) {
  }

  static forRootAsync(options: CassandraModuleAsyncOptions): DynamicModule {
    const connName = getConnectionToken(options.connectionName);
    const cassandraConnectionNameProvider = {
      provide: CASSANDRA_CONNECTION_NAME,
      useValue: connName,
    };

    const connectionProvider = {
      provide: connName,
      useFactory: async (cassandraModuleOptions: CassandraModuleOptions): Promise<any> => {
        const client = new Client(cassandraModuleOptions);
        return await defer(async () => client).toPromise();
      },
      inject: [CASSANDRA_MODULE_OPTIONS],
    };
    return {
      module: CassandraCoreModule,
      imports: options.imports,
      providers: [
        ...this.createAsyncProviders(options),
        connectionProvider,
        cassandraConnectionNameProvider,
      ],
      exports: [connectionProvider],
    };
  }

  private static createAsyncProviders(options: CassandraModuleAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(options: CassandraModuleAsyncOptions): Provider {
    return {
      provide: CASSANDRA_MODULE_OPTIONS,
      useFactory: async (optionsFactory: CassandraOptionsFactory) =>
        await optionsFactory.createCassandraOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
