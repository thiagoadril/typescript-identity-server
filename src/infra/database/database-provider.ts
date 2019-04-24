import { ConfigModule } from '../../modules/config/config.module';
import { ConfigService } from '../../services/config/config.service';
import { MongooseModule } from '@nestjs/mongoose';

export const databaseProviders = [

  /**
   * Options in https://mongoosejs.com/docs/connections.html
   */

  MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.apiConfig.mongoUri,
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      promiseLibrary: global.Promise,
      reconnectInterval: config.apiConfig.mongoReconnectInterval,
      poolSize: config.apiConfig.mongoPollSize,
      bufferMaxEntries: config.apiConfig.mongoBufferMaxEntries,
      connectTimeoutMS: config.apiConfig.mongoConnectTimeOutMs,
      socketTimeoutMS: config.apiConfig.mongoSocketTimeOutMs,
    }),
  }),

];
