import { DynamicModule, Module } from '@nestjs/common';
import { CassandraCoreModule } from './cassandra.core.module';
import { LoaderService } from '../../../modules/loader/loader.service';

@Module({})
export class CassandraModule {
  static forRootAsync(options: {}): DynamicModule {
    return {
      module: CassandraModule,
      providers: [LoaderService],
      imports: [CassandraCoreModule.forRootAsync(options)],
    };
  }
}
