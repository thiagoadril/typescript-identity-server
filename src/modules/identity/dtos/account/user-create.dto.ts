import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Matches } from 'class-validator/decorator/decorators';
import { ValidationConstants } from '../../../../core/constants/validation-constants';
import { ApiModelProperty } from '@nestjs/swagger';

export class UserCreateDto {
  @IsDefined({ message: ValidationConstants.required })
  @IsNotEmpty({ message: ValidationConstants.empty })
  @MinLength(3, { message: ValidationConstants.minLength })
  @MaxLength(100, { message: ValidationConstants.maxLength })
  @Matches(/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/, {
    message: ValidationConstants.invalid,
  })
  name: string;

  @IsNotEmpty({ message: ValidationConstants.empty })
  @IsEmail({}, { message: ValidationConstants.invalid })
  @MinLength(7, { message: ValidationConstants.minLength })
  @MaxLength(320, { message: ValidationConstants.maxLength })
  username: string;

  @IsDefined({ message: ValidationConstants.required })
  @IsNotEmpty({ message: ValidationConstants.empty })
  @MinLength(6, { message: ValidationConstants.minLength })
  @MaxLength(24, { message: ValidationConstants.maxLength })
  password: string;
}
