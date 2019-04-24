import { Module } from '@nestjs/common';
import { CatsController } from '../../controllers/cats/cats.controller';
import { CatsService } from '../../services/cats/cats.service';
import { CatSchema } from '../../domain/entities/cat/cat-schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Cat', schema: CatSchema }])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
