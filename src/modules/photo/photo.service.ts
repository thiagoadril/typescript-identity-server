import { Injectable } from '@nestjs/common';
import { PhotoRepository } from './photo.repository';
import { PhotoDto } from './photo.dto';
import { Observable } from 'rxjs';

@Injectable()
export class PhotoService {
  constructor(private readonly repository: PhotoRepository) {
  }

  get allPhotos(): Observable<PhotoDto[]> {
    return new Observable<PhotoDto[]>(subscriber => {
      this.repository.all.then(data => {
        const photos: PhotoDto[] = [];

        data.rows.map(value => photos.push(new PhotoDto(
          value.id,
          value.name,
        )));

        subscriber.next(photos);
        subscriber.complete();
      });
    });
  }
}
