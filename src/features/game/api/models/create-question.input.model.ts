import { Trim } from '../../../../infrastructure/decorators/transform/trim';
import { ToLowerCase } from '../../../../infrastructure/decorators/transform/to-lower-case';
import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreateQuestionInputModel {
  @Trim()
  @ToLowerCase()
  @IsString({ message: 'value must be a string' })
  @IsDefined()
  question: string;

  @Trim()
  @ToLowerCase()
  @IsString({ message: 'value must be a string' })
  @IsDefined()
  answer: string;

  @IsNumber()
  @IsDefined()
  day: number;

  @IsNumber()
  @IsDefined()
  position: number;
}
