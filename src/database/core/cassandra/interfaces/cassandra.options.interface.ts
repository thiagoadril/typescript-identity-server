import { Type } from '@nestjs/common';
import { ModuleMetadata } from '@nestjs/common/interfaces';
import { ClientOptions } from 'cassandra-driver';

export interface CassandraModuleOptions extends ClientOptions {
  [key: string]: any;
}

export interface CassandraOptionsFactory {
  createCassandraOptions():
    | Promise<CassandraModuleOptions>
    | CassandraModuleOptions;
}

export interface CassandraModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  connectionName?: string;
  useExisting?: Type<CassandraOptionsFactory>;
  useClass?: Type<CassandraOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) => Promise<CassandraModuleOptions> | CassandraModuleOptions;
  inject?: any[];
}
