import { AppService } from '../../services/app/app.service';
import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { VersionModule } from '../version/version.module';
import { AuthModule } from '../auth/auth.module';
import { HeaderMiddleware } from '../../core/middleware/header.middleware';

@Module({
  imports: [
    ConfigModule,
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
