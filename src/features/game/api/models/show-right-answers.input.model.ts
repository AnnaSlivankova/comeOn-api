import { IsBoolean } from 'class-validator';

export class ShowRightAnswersInputModel {
  @IsBoolean()
  isOpen: boolean;
}
