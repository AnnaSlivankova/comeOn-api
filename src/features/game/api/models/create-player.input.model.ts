import { IsDefined, IsString } from 'class-validator';

export class CreatePlayerInputModel {
  @IsString({ message: 'value must be a string' })
  @IsDefined()
  userId: string;
}
