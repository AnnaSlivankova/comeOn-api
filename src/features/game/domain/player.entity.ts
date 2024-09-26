import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { calculatePlayerRating } from '../application/calculate-player-rating';

@Schema()
export class Player {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  surname: string;

  @Prop({ required: true, type: Number })
  score: number;

  @Prop({ required: true, type: Number })
  rating: number;

  @Prop({ required: true, type: Number })
  time: number;

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

  constructor(data: Partial<Player>) {
    this.name = data.name || '';
    this.surname = data.surname || '';
    this.score = data.score || 0;
    this.time = data.time || 0;
    this.rating = calculatePlayerRating(this.score, this.time);

    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
export type PlayerDocument = HydratedDocument<Player>;
