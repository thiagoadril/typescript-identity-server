import { Controller, Get } from '@nestjs/common';
import { CatsService } from '../../services/cats/cats.service';
import { CatDto } from '../../domain/dto/cat/cat-dto';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {
  }

  @Get('create')
  async create() {
    this.catsService.create(new CatDto('cat1', 1, 'bla bla bla '));
  }
}
