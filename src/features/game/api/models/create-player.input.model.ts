import { Trim } from 'src/infrastructure/decorators/transform/trim';
import { ToLowerCase } from '../../../../infrastructure/decorators/transform/to-lower-case';
import { IsAlpha, IsDefined, IsNumber, IsString, Length } from 'class-validator';

export class CreatePlayerInputModel {
  @Trim()
  @ToLowerCase()
  @Length(2, 10, { message: 'value is too long' })
  @IsAlpha('ru-RU')
  @IsString({ message: 'value must be a string' })
  @IsDefined()
  name: string;

  @Trim()
  @ToLowerCase()
  @Length(1, 15, { message: 'value is too long' })
  @IsAlpha('ru-RU')
  @IsString({ message: 'value must be a string' })
  @IsDefined()
  surname: string;

  @IsNumber()
  @IsDefined()
  score: number;

  @Trim()
  @ToLowerCase()
  @IsString({ message: 'value must be a string' })
  @IsDefined()
  time: string;
}
