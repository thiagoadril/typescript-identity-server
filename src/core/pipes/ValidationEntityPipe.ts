import { ArgumentMetadata, Injectable, PipeTransform, UnprocessableEntityException } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationEntityPipe implements PipeTransform<any> {
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
    if (errors.length > 0) {
      const errorList = [];
      errors.map(err => {
        if (err.constraints !== null) {
          const constraintValues = Object.values(err.constraints);
          if (constraintValues != null && constraintValues.length > 0) {
            constraintValues.map(message => {
              errorList.push({ [err.property]: message });
            });
          }
        }
      });
      throw new UnprocessableEntityException(errorList);
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find(type => metatype === type);
  }
}
