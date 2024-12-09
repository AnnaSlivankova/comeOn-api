import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Info {
  @Prop({ required: true, type: String })
  targetDate: string;

  @Prop({ required: true, type: String })
  bibleText: string;

  @Prop({
    required: true,
    type: Date,
  })
  createdAt: Date;

  @Prop({
    required: true,
    type: Date,
  })
  updatedAt: Date;

  constructor(data: Partial<Info>) {
    this.targetDate = data.targetDate;
    this.bibleText = data.bibleText;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export const InfoSchema = SchemaFactory.createForClass(Info);
export type InfoDocument = HydratedDocument<Info>;
