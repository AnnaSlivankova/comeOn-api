import { IsDefined, IsNumber, IsString } from 'class-validator';

export class CreatePlayerByAdminInputModel {
  @IsString({ message: 'value must be a string' })
  @IsDefined()
  userId: string;

  @IsNumber()
  @IsDefined()
  score: number;
}
