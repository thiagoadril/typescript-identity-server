import { Module } from '@nestjs/common';
import { LoaderService } from './loader.service';

@Module({
  providers: [
    {
      provide: LoaderService,
      useValue: new LoaderService(),
    },
  ],
  exports: [LoaderService],
})
export class LoaderModule {}
