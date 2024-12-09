import { Trim } from '../../../../infrastructure/decorators/transform/trim';
import { IsDefined, IsString } from 'class-validator';

export class CreateInfoInputModel {
  @Trim()
  @IsString({ message: 'value must be a string' })
  @IsDefined()
  targetDate: string;

  @Trim()
  @IsString({ message: 'value must be a string' })
  @IsDefined()
  bibleText: string;
}
