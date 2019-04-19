import * as Joi from 'joi';

export class ConfigSchema {
  public SCHEMA: Joi.ObjectSchema;

  constructor() {
    this.SCHEMA = Joi.object({
      NODE_Env: Joi.string().valid(['development', 'production', 'test']),
      PORT: Joi.number().default(3000),
    });
  }
}
