export class ApiConfig {
  name: string;
  version: string;
  environment: string;
  debug: boolean;
  port: number;
  authEnable: boolean;
  corsEnable: boolean;
  mongoUri: string;
  mongoReconnectInterval: number;
  mongoPollSize: number;
  mongoBufferMaxEntries: number;
  mongoConnectTimeOutMs: number;
  mongoSocketTimeOutMs: number;

  constructor(name: string, version: string, environment: string, debug: boolean,
              port: number, authEnable: boolean, corsEnable: boolean, mongoUri: string,
              mongoReconnectInterval: number, mongoPollSize: number,
              mongoBufferMaxEntries: number, mongoConnectTimeOutMs: number,
              mongoSocketTimeOutMs: number) {
    this.name = name;
    this.version = version;
    this.environment = environment;
    this.debug = debug;
    this.port = port;
    this.authEnable = authEnable;
    this.corsEnable = corsEnable;
    this.mongoUri = mongoUri;
    this.mongoReconnectInterval = mongoReconnectInterval;
    this.mongoPollSize = mongoPollSize;
    this.mongoBufferMaxEntries = mongoBufferMaxEntries;
    this.mongoConnectTimeOutMs = mongoConnectTimeOutMs;
    this.mongoSocketTimeOutMs = mongoSocketTimeOutMs;
  }
}
