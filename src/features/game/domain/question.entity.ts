import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Question {
  @Prop({ required: true, type: String })
  question: string;

  @Prop({ required: true, type: String })
  answer: string;

  @Prop({ required: true, type: Number })
  day: number;

  @Prop({ required: true, type: Number })
  position: number;

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

  constructor(data: Partial<Question>) {
    this.question = data.question;
    this.answer = data.answer;
    this.day = data.day;
    this.position = data.position;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
export type QuestionDocument = HydratedDocument<Question>;
