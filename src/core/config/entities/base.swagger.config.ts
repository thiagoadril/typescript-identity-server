export class BaseSwaggerConfig {
  swaggerTitle: string;
  swaggerDescription: string;
  swaggerVersion: string;
  swaggerPath: string;
  constructor(
    swaggerTitle: string,
    swaggerDescription: string,
    swaggerVersion: string,
    swaggerPath: string,
  ) {
    this.swaggerTitle = swaggerTitle;
    this.swaggerDescription = swaggerDescription;
    this.swaggerVersion = swaggerVersion;
    this.swaggerPath = swaggerPath;
  }
}
