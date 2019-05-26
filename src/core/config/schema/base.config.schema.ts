import * as Joi from 'joi';

export class BaseConfigSchema {
  public Schema: Joi.ObjectSchema;

  constructor() {
    /**
     * Api Configuration
     */
    const apiConfig = {
      API_DEBUG: Joi.boolean().required(),
      API_NAME: Joi.string().required(),
      API_VERSION: Joi.string().required(),
      API_PORT: Joi.number().required(),
      API_AUTH_ENABLE: Joi.boolean()
        .default(true)
        .required(),
      API_CORS_ENABLE: Joi.boolean()
        .default(false)
        .required(),
    };

    /**
     * Cassandra Configuration
     */

    const cassandraConfig = {
      CASSANDRA_CONTACT_POINTS: Joi.string().required(),
      CASSANDRA_LOCAL_DATACENTER: Joi.string().required(),
      CASSANDRA_KEYSPACE: Joi.string().required(),
      CASSANDRA_PORT: Joi.number()
        .default(9042)
        .required(),
      CASSANDRA_AUTH_ENABLE: Joi.boolean()
        .default(true)
        .required(),
      CASSANDRA_AUTH_USERNAME: Joi.string().required(),
      CASSANDRA_AUTH_PASSWORD: Joi.string().required(),
      CASSANDRA_QUERY_CONSISTENCY: Joi.number().required(),
    };

    /**
     * Swagger Configuration
     */

    const swaggerConfig = {
      SWAGGER_TITLE: Joi.string().required(),
      SWAGGER_DESCRIPTION: Joi.string().required(),
      SWAGGER_VERSION: Joi.string().required(),
      SWAGGER_PATH: Joi.string().required(),
    };

    this.Schema = Joi.object({
      ...apiConfig,
      ...cassandraConfig,
      ...swaggerConfig,
    });
  }
}
