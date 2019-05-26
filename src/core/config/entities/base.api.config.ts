export class BaseApiConfig {
  name: string;
  version: string;
  environment: string;
  debug: boolean;
  port: number;
  authEnable: boolean;
  corsEnable: boolean;

  constructor(
    name: string,
    version: string,
    environment: string,
    debug: boolean,
    port: number,
    authEnable: boolean,
    corsEnable: boolean,
  ) {
    this.name = name;
    this.version = version;
    this.environment = environment;
    this.debug = debug;
    this.port = port;
    this.authEnable = authEnable;
    this.corsEnable = corsEnable;
  }
}
