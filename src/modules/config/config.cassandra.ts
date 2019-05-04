import { CassandraModuleOptions, CassandraOptionsFactory } from '../../database/core/cassandra/interfaces';
import { ConfigService } from './config.service';
import { Injectable } from '@nestjs/common';
import { auth } from 'cassandra-driver';
import PlainTextAuthProvider = auth.PlainTextAuthProvider;

@Injectable()
export class ConfigCassandraService implements CassandraOptionsFactory {
  constructor(private readonly configService: ConfigService) {
  }

  createCassandraOptions(): Promise<CassandraModuleOptions> {
    return new Promise<CassandraModuleOptions>(resolve => {
        resolve(
          {
            contactPoints: this.configService.dbConfig.cassandraContactPoints,
            localDataCenter: this.configService.dbConfig.cassandraLocalDataCenter,
            keyspace: this.configService.dbConfig.cassandraKeyspace,
            protocolOptions: {
              port: this.configService.dbConfig.cassandraPort,
            },
            authProvider: !this.configService.dbConfig.cassandraAuthEnable ? null :
              new PlainTextAuthProvider(
                this.configService.dbConfig.cassandraAuthUsername,
                this.configService.dbConfig.cassandraAuthPassword),
            queryOptions: {
              consistency: this.configService.dbConfig.cassandraQueryConsistency,
            },
          },
        );
      },
    );
  }
}
