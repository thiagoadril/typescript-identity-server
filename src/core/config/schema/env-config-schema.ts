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
        API_AUTH_ENABLED: Joi.boolean().required(),
        API_CORS_ENABLE: Joi.boolean().required(),
        MONGO_URI: Joi.string().required(),
        MONGO_RECONNECT_INTERVAL: Joi.number().default(500),
        MONGO_POLL_SIZE: Joi.number().default(10),
        MONGO_BUFFER_MAX_ENTRIES: Joi.number().default(0),
        MONGO_CONNECT_TIMEOUT_MS: Joi.number().default(30000),
        MONGO_SOCKET_TIMEOUT_MS: Joi.number().default(30000),
      },
    );
  }
}
