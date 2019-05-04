import { Controller, Get } from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Observable } from 'rxjs';
import { PhotoDto } from './photo.dto';
import { types } from 'cassandra-driver';
import Uuid = types.Uuid;

@Controller('photo')
export class PhotoController {
  constructor(private readonly service: PhotoService) {
  }

  @Get()
  index(): Observable<PhotoDto[]> {
    return new Observable<PhotoDto[]>(subscriber => {
      this
        .service
        .allPhotos
        .subscribe(data => {

          try {

            data.forEach(obj => {
              obj.date = new Date();
            });

            data.push(new PhotoDto(Uuid.random(), 'custom1'));
            data.push(new PhotoDto(Uuid.random(), 'custom2'));

            subscriber.next(data);
          } catch (e) {
            subscriber.error(e);
          } finally {
            subscriber.complete();
          }

        });
    });
  }
}
