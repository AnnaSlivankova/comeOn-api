import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class TokenBlackList {
  @Prop({ required: true, type: String })
  public token: string;
}

export const TokenBlackListSchema = SchemaFactory.createForClass(TokenBlackList);
export type TokenBlackListDocument = HydratedDocument<TokenBlackList>;
