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

  public load(): ConfigService {
    const config = dotenv.parse(fs.readFileSync(this.envConfigFile));
    this.envConfig = ConfigService.validate(config);
    this.apiConfig = new ApiConfig(
      this.getApiEnvironment(),
      this.getApiName(),
      this.getApiVersion(),
      this.getApiPort(),
      this.isApiAuthEnabled(),
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
   * Verify authentication status
   */
  private isApiAuthEnabled(): boolean {
    return Boolean(this.getParam('API_AUTH_ENABLED'));
  }
}
