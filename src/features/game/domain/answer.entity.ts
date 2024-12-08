import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Answer {
  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true, type: String })
  questionId: string;

  @Prop({ required: true, type: String })
  answer: string;

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

  constructor(data: Partial<Answer>) {
    this.userId = data.userId;
    this.questionId = data.questionId;
    this.answer = data.answer;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
export type AnswerDocument = HydratedDocument<Answer>;
