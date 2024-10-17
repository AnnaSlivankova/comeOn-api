import { IsDefined, IsString } from 'class-validator';
import { Trim } from '../../../../infrastructure/decorators/transform/trim';

export class LoginInputModel {
  @Trim()
  @IsString()
  @IsDefined()
  name: string;

  @Trim()
  @IsString()
  @IsDefined()
  surname: string;

  @Trim()
  @IsString()
  @IsDefined()
  password: string;
}
