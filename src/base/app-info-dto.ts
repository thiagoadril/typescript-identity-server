export class AppInfoDto {
  name: string;
  version: string;
  status: string;
  requestedOn: Date;
  constructor(name: string, version: string, status: string){
    this.name = name;
    this.version = version;
    this.status = status;
    this.requestedOn = new Date();
  }
}
