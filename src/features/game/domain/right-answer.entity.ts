import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class RightAnswer {
  @Prop({ required: true, type: String })
  question: string;

  @Prop({ required: true, type: String })
  answer: string;

  @Prop({ required: true, type: Number })
  position: number;

  @Prop({ required: true, type: Boolean })
  isOpen: boolean;

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

  constructor(data: Partial<RightAnswer>) {
    this.question = data.question;
    this.answer = data.answer;
    this.position = data.position;
    this.isOpen = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export const RightAnswerSchema = SchemaFactory.createForClass(RightAnswer);
export type RightAnswerDocument = HydratedDocument<RightAnswer>;
