export class VersionDto {
  name: string;
  build: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(name: string, build: string, createdAt: Date, updatedAt: Date) {
    this.name = name;
    this.build = build;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
