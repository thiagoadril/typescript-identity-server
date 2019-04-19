import { Injectable } from '@nestjs/common';
import { VersionDto } from './dto/version-dto';

@Injectable()
export class VersionService {
  async CreateVersion(name: string, build: string, createdAt: Date, updatedAt: Date): Promise<VersionDto> {
    return await new VersionDto(name, build, createdAt, updatedAt);
  }
}
