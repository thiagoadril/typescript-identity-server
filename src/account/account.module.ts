import { Module } from '@nestjs/common';
import { AppController } from '../app.controller';
import { AccountController } from './account.controller';
import { AppService } from '../app.service';
import { AccountService } from './account.service';

@Module({
  imports: [],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule {}
