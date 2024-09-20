import { Transform, TransformFnParams } from 'class-transformer';

export const ToLowerCase = () =>
  Transform(({ value }: TransformFnParams) => value?.toLowerCase());
