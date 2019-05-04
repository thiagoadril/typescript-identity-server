import { DynamicModule, Module } from '@nestjs/common';
import { CassandraCoreModule } from './cassandra.core.module';
import { ConfigService } from '../../../modules/config/config.service';

@Module({})
export class CassandraModule {
  static forRootAsync(options: {}): DynamicModule {
    return {
      module: CassandraModule,
      providers: [ConfigService],
      imports: [CassandraCoreModule.forRootAsync(options)],
    };
  }
}
