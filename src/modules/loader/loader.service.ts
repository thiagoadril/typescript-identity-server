import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { BaseConfig } from '../../core/config/interface/base.config.interface';
import { BaseConfigSchema } from '../../core/config/schema/base.config.schema';
import { BaseApiConfig } from '../../core/config/entities/base.api.config';
import { BaseDbConfig } from '../../core/config/entities/base.db.config';
import appRoot = require('app-root-path');
import { BaseSwaggerConfig } from '../../core/config/entities/base.swagger.config';

export class LoaderService {
  public apiConfig: BaseApiConfig;
  public dbConfig: BaseDbConfig;
  public swaggerConfig: BaseSwaggerConfig;
  /**
   * Configuration Static Fields
   */
  private environment: string =
    process.env.NODE_ENV === 'dev' ||
    process.env.NODE_ENV === 'prd' ||
    process.env.NODE_ENV === 'qas'
      ? process.env.NODE_ENV
      : 'dev';

  private envConfigFolder: string = 'src/settings';
  private envConfigFile: string = `${appRoot}/${this.envConfigFolder}/${
    this.environment
  }.settings`;

  private envConfig: BaseConfig;

  constructor() {
    this.load();
  }

  /**
   * Validate Configuration Schema
   * @param envConfig
   */
  private static validate(envConfig: BaseConfig): BaseConfig {
    const envVarsSchema: Joi.ObjectSchema = new BaseConfigSchema().Schema;
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
  public load(): LoaderService {
    const config = dotenv.parse(fs.readFileSync(this.envConfigFile));
    this.envConfig = LoaderService.validate(config);
    this.apiConfig = new BaseApiConfig(
      this.getApiName(),
      this.getApiVersion(),
      this.getApiEnvironment(),
      this.isApiDebug(),
      this.getApiPort(),
      this.isApiAuthEnabled(),
      this.isApiCorsEnabled(),
    );
    this.dbConfig = new BaseDbConfig(
      this.getCassandraContactPoints(),
      this.getCassandraLocalDataCenter(),
      this.getCassandraKeyspace(),
      this.getCassandraPort(),
      this.isCassandraAuthEnable(),
      this.getCassandraAuthUsername(),
      this.getCassandraAuthPassword(),
      this.getCassandraQueryConsistency(),
    );
    this.swaggerConfig = new BaseSwaggerConfig(
      this.getSwaggerTitle(),
      this.getSwaggerDescription(),
      this.getSwaggerVersion(),
      this.getSwaggerPath(),
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
   * Get api settings
   */
  private getApiEnvironment(): string {
    return this.environment;
  }

  /**
   * Verify api debug
   */
  private isApiDebug(): boolean {
    return Boolean(this.getParam('API_DEBUG'));
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
   * Get Cassandra contact points
   */
  private getCassandraContactPoints(): string[] {
    const value: string = String(this.getParam('CASSANDRA_CONTACT_POINTS'));
    let arrValue: string[];
    try {
      arrValue = value.split(',');
    } catch (e) {
      throw new Error(e);
    }
    return arrValue;
  }

  /**
   * Get Cassandra local datacenter
   */
  private getCassandraLocalDataCenter(): string {
    return String(this.getParam('CASSANDRA_LOCAL_DATACENTER'));
  }

  /**
   * Get Cassandra keyspace
   */
  private getCassandraKeyspace(): string {
    return String(this.getParam('CASSANDRA_KEYSPACE'));
  }

  /**
   * Get Cassandra port
   */
  private getCassandraPort(): number {
    return Number(this.getParam('CASSANDRA_PORT'));
  }

  /**
   * Get Cassandra identity status
   */
  private isCassandraAuthEnable(): boolean {
    return Boolean(this.getParam('CASSANDRA_AUTH_ENABLE'));
  }

  /**
   * Get Cassandra identity username
   */
  private getCassandraAuthUsername(): string {
    return String(this.getParam('CASSANDRA_AUTH_USERNAME'));
  }

  /**
   * Get Cassandra identity password
   */
  private getCassandraAuthPassword(): string {
    return String(this.getParam('CASSANDRA_AUTH_PASSWORD'));
  }

  /**
   * Get Cassandra query consistency
   */
  private getCassandraQueryConsistency(): number {
    return Number(this.getParam('CASSANDRA_QUERY_CONSISTENCY'));
  }

  /**
   * Get Swagger title
   */
  private getSwaggerTitle(): string {
    return String(this.getParam('SWAGGER_TITLE'));
  }

  /**
   * Get Swagger description
   */
  private getSwaggerDescription(): string {
    return String(this.getParam('SWAGGER_DESCRIPTION'));
  }

  /**
   * Get Swagger version
   */
  private getSwaggerVersion(): string {
    return String(this.getParam('SWAGGER_VERSION'));
  }

  /**
   * Get Swagger path
   */
  private getSwaggerPath(): string {
    return String(this.getParam('SWAGGER_PATH'));
  }
}
