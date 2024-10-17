import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class User {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  surname: string;

  @Prop({ required: true, type: Number })
  rating: number;

  @Prop({ required: true, type: Number, default: 0 })
  position: number;

  @Prop({ required: true, type: String })
  hash: string;

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

  constructor(data: Partial<User>) {
    this.name = data.name;
    this.surname = data.surname;
    this.rating = data.rating;
    this.hash = data.hash;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
