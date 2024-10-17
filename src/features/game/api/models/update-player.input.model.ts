import { IsDefined, IsNumber, IsString } from 'class-validator';

export class UpdatePlayerInputModel {
  @IsNumber()
  @IsDefined()
  score: number;

  @IsNumber()
  @IsDefined()
  time: number;

  @IsString({ message: 'value must be a string' })
  @IsDefined()
  userId: string;
}
