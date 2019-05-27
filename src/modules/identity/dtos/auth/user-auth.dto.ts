import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ValidationConstants } from '../../../../core/constants/validation-constants';

export class UserAuthDto {
  @IsDefined({ message: ValidationConstants.required })
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
