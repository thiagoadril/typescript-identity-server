import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { HeaderMiddleware } from '../../core/middleware/header.middleware';
import { CassandraModule } from '../../database/core/cassandra';
import { IdentityModule } from '../identity/identity.module';
import { LoaderCassandra } from '../loader/loader.cassandra';
import { LoaderModule } from '../loader/loader.module';
import { AppService } from './app.service';
import { IndexModule } from '../index/index.module';

@Module({
  imports: [
    LoaderModule,
    CassandraModule.forRootAsync({
      useClass: LoaderCassandra,
      imports: [LoaderModule],
    }),
    IndexModule,
    IdentityModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule implements NestModule {
  /**
   * Configure module for all routes
   * middlewares and others
   */
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HeaderMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
