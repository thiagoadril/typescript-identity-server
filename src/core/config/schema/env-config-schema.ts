import * as Joi from 'joi';

export class EnvConfigSchema {
  public Schema: Joi.ObjectSchema;

  constructor() {
    this.Schema = Joi.object(
      {
        API_DEBUG: Joi.boolean().required(),
        API_NAME: Joi.string().required(),
        API_VERSION: Joi.string().required(),
        API_PORT: Joi.number().default(3000),
        API_AUTH_ENABLE: Joi.boolean().required(),
        API_CORS_ENABLE: Joi.boolean().required(),
        CASSANDRA_CONTACT_POINTS: Joi.string().default('localhost').required(),
        CASSANDRA_LOCAL_DATACENTER: Joi.string().default('datacenter1').required(),
        CASSANDRA_KEYSPACE: Joi.string().required(),
        CASSANDRA_PORT: Joi.number().required(),
        CASSANDRA_AUTH_ENABLE: Joi.boolean().default(true).required(),
        CASSANDRA_AUTH_USERNAME: Joi.string().required(),
        CASSANDRA_AUTH_PASSWORD: Joi.string().required(),
        CASSANDRA_QUERY_CONSISTENCY: Joi.number().required(),
      },
    );
  }
}
