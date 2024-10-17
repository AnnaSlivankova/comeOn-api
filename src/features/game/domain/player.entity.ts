import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Player {
  @Prop({ required: true, type: Number, default: 0 })
  prevGamesScore: number;

  @Prop({ required: true, type: String })
  userId: string;

  @Prop({ required: true, type: Number })
  totalScore: number;

  @Prop({ required: true, type: Number, default: 0 })
  gamesCount: number;

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
    this.prevGamesScore = data.prevGamesScore;
    this.userId = data.userId;
    this.totalScore = data.totalScore;
    this.gamesCount = data.gamesCount;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  updatePlayerGamesCount() {
    this.gamesCount += 1;
    this.updatedAt = new Date();
  }

  updatePlayerTotalScore(totalScore: number) {
    this.totalScore = totalScore;
    this.updatedAt = new Date();
  }
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
// Добавляем методы в схему
PlayerSchema.methods.updatePlayerGamesCount = function() {
  this.gamesCount += 1;
  this.updatedAt = new Date();
};

PlayerSchema.methods.updatePlayerTotalScore = function(totalScore: number) {
  this.totalScore = totalScore;
  this.updatedAt = new Date();
};

export type PlayerDocument = HydratedDocument<Player>;
