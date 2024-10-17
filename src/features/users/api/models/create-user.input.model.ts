import { IsDefined, IsString, Length, Matches } from 'class-validator';
import { Trim } from '../../../../infrastructure/decorators/transform/trim';
import { ToLowerCase } from '../../../../infrastructure/decorators/transform/to-lower-case';

export class CreateUserInputModel {
  @Trim()
  @ToLowerCase()
  @Length(2, 10, { message: 'value is too long' })
  @Matches(/^[А-Яа-яЁё\s]+$/, {
    message: 'value must contain only Russian letters and spaces',
  })
  @IsString({ message: 'value must be a string' })
  @IsDefined()
  name: string;

  @Trim()
  @ToLowerCase()
  @Length(1, 15, { message: 'value is too long' })
  @Matches(/^[А-Яа-яЁё\s]+$/, {
    message: 'value must contain only Russian letters and spaces',
  })
  @IsString({ message: 'value must be a string' })
  @IsDefined()
  surname: string;

  @Trim()
  @IsString({ message: 'value must be a string' })
  @IsDefined()
  password: string;
}
