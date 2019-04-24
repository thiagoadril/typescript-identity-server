import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cat } from '../../domain/entities/cat/cat.interface';
import { Model } from 'mongoose';
import { CatDto } from '../../domain/dto/cat/cat-dto';

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}

  async create(cat: CatDto) {
    const obj = new this.catModel(cat);
    return await obj.save();
  }
}
