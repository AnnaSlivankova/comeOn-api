import { Trim } from '../../../../infrastructure/decorators/transform/trim';
import { ToLowerCase } from '../../../../infrastructure/decorators/transform/to-lower-case';
import { IsDefined, IsString } from 'class-validator';

export class CreateAnswerInputModel {
  @IsString({ message: 'value must be a string' })
  @IsDefined()
  userId: string;

  @IsString({ message: 'value must be a string' })
  @IsDefined()
  questionId: string;

  @Trim()
  @ToLowerCase()
  @IsString({ message: 'value must be a string' })
  @IsDefined()
  answer: string;
}
