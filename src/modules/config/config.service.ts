import * as dotenv from 'dotenv';
import * as Joi from 'joi';
import * as fs from 'fs';
import { EnvConfig } from '../../core/config/interface/env-config.interface';
import { EnvConfigSchema } from '../../core/config/schema/env-config-schema';
import { ApiConfig } from '../../core/config/entities/api-config';
import { DbConfig } from '../../core/config/entities/db-config';
import appRoot = require('app-root-path');

export class ConfigService {
  public apiConfig: ApiConfig;
  public dbConfig: DbConfig;
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
    );
    this.dbConfig = new DbConfig(
      this.getCassandraContactPoints(),
      this.getCassandraLocalDataCenter(),
      this.getCassandraKeyspace(),
      this.getCassandraPort(),
      this.isCassandraAuthEnable(),
      this.getCassandraAuthUsername(),
      this.getCassandraAuthPassword(),
      this.getCassandraQueryConsistency(),
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
   * Get Cassandra auth status
   */
  private isCassandraAuthEnable(): boolean {
    return Boolean(this.getParam('CASSANDRA_AUTH_ENABLE'));
  }

  /**
   * Get Cassandra auth username
   */
  private getCassandraAuthUsername(): string {
    return String(this.getParam('CASSANDRA_AUTH_USERNAME'));
  }

  /**
   * Get Cassandra auth password
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
}
