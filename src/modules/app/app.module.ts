import { AppService } from './app.service';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { AuthModule } from '../auth/auth.module';
import { HeaderMiddleware } from '../../core/middleware/header.middleware';
import { PhotoModule } from '../photo/photo.module';
import { CassandraModule } from '../../database/core/cassandra';
import { VersionModule } from '../version/version.module';
import { ConfigCassandra } from '../config/config.cassandra';

@Module({
  imports: [
    ConfigModule,
    CassandraModule.forRootAsync({
      useClass: ConfigCassandra,
      imports: [ConfigModule],
    }),
    PhotoModule,
    AuthModule,
    VersionModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule implements NestModule {
  /**
   * Configure module for all routes
   * middlewares and others
   */
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HeaderMiddleware)
      .forRoutes({
        path: '*', method: RequestMethod.ALL,
      });
  }
}
