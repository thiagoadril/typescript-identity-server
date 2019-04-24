import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { EnvConfig } from '../../core/config/interface/env-config.interface';
import { EnvConfigSchema } from '../../core/config/schema/env-config-schema';
import { ApiConfig } from '../../core/config/entities/api-config';
import appRoot = require('app-root-path');

export class ConfigService {
  public apiConfig: ApiConfig;
  /**
   * Configuration Static Fields
   */
  private environment: string =
    process.env.NODE_ENV === 'dev' ||
    process.env.NODE_ENV === 'prd' ||
    process.env.NODE_ENV === 'qas' ?
      process.env.NODE_ENV : 'dev';

  private envConfigFolder: string = 'src/settings';
  private envConfigFile: string =
    `${appRoot}/${this.envConfigFolder}/${this.environment}.env`;

  private envConfig: EnvConfig;

  constructor() {
    this.load();
  }

  /**
   * Validate Configuration Schema
   * @param envConfig
   */
  private static validate(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = new EnvConfigSchema().Schema;
    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  /**
   * Load configurations
   */
  public load(): ConfigService {
    const config = dotenv.parse(fs.readFileSync(this.envConfigFile));
    this.envConfig = ConfigService.validate(config);
    this.apiConfig = new ApiConfig(
      this.getApiName(),
      this.getApiVersion(),
      this.getApiEnvironment(),
      this.isApiDebug(),
      this.getApiPort(),
      this.isApiAuthEnabled(),
      this.isApiCorsEnabled(),
      this.getMongoUri(),
      this.getMongoReconnectInterval(),
      this.getMongoPoolSize(),
      this.getMongoBufferMaxEntries(),
      this.getMongoConnectTimeOutMS(),
      this.getMongoSocketTimeOutMS(),
    );
    return this;
  }

  /**
   * Get configuration params
   * @param key
   */
  private getParam(key: string): string {
    return this.envConfig[key];
  }

  /**
   * Get api environment
   */
  private getApiEnvironment(): string {
    return this.environment;
  }

  /**
   * Verify api debug
   */
  private isApiDebug(): boolean {
    return Boolean(this.getParam('API_AUTH_ENABLED'));
  }

  /**
   * Get api name
   */
  private getApiName(): string {
    return String(this.getParam('API_NAME'));
  }

  /**
   * Get api index
   */
  private getApiVersion(): string {
    return String(this.getParam('API_VERSION'));
  }

  /**
   * Get api port
   */
  private getApiPort(): number {
    return Number(this.getParam('API_PORT'));
  }

  /**
   * Verify authentication enable/disable
   */
  private isApiAuthEnabled(): boolean {
    return Boolean(this.getParam('API_AUTH_ENABLED'));
  }

  /**
   * Verify cors enable/disable
   */
  private isApiCorsEnabled(): boolean {
    return Boolean(this.getParam('API_CORS_ENABLE'));
  }

  /**
   * Get MongoDB URI
   */
  private getMongoUri(): string {
    return String(this.getParam('MONGO_URI'));
  }

  /**
   * Get MongoDB reconnect interval
   */
  private getMongoReconnectInterval(): number {
    return Number(this.getParam('MONGO_RECONNECT_INTERVAL'));
  }

  /**
   * Get MongoDB poll size
   */
  private getMongoPoolSize(): number {
    return Number(this.getParam('MONGO_POLL_SIZE'));
  }

  /**
   * Get MongoDB buffer max entries
   */
  private getMongoBufferMaxEntries(): number {
    return Number(this.getParam('MONGO_BUFFER_MAX_ENTRIES'));
  }

  /**
   * Get MongoDB connect timeout (ms)
   */
  private getMongoConnectTimeOutMS(): number {
    return Number(this.getParam('MONGO_CONNECT_TIMEOUT_MS'));
  }

  /**
   * Get MongoDB socket timeout (ms)
   */
  private getMongoSocketTimeOutMS(): number {
    return Number(this.getParam('MONGO_SOCKET_TIMEOUT_MS'));
  }
}
