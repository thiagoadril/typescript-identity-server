import { AppService } from './app.service';
import { AccountModule } from '../../modules/account/account.module';
import { VersionModule } from '../../modules/version/version.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from 'nestjs-config';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.load(path.resolve(__dirname, 'config', '**/!(*.d).{ts,js}')),
    // ConfigModule.resolveRootPath(__dirname).load('config/**/!(*.d).{ts,js}'),
    AccountModule,
    VersionModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
}
