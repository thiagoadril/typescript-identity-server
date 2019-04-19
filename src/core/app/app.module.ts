import { AppService } from './app.service';
import { AccountModule } from '../../modules/account/account.module';
import { VersionModule } from '../../modules/version/version.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AccountModule,
    VersionModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {
}
