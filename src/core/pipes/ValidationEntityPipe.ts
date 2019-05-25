import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException, UnprocessableEntityException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  skip: boolean = false;

  constructor(skip: boolean = false) {
    this.skip = skip;
  }

  async transform(value, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object, { skipMissingProperties: this.skip });
    console.log(errors);
    if (errors.length > 0) {
      const messages = [];
      errors.map(value => {
        if (value.constraints !== null) {
          const constraintValues = Object.values(value.constraints);
          if (constraintValues != null && constraintValues.length > 0) {
            constraintValues.map(message => {
              messages.push(message);
            });
          }
        }
      });
      throw new UnprocessableEntityException(messages);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}