import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player } from '../domain/player.entity';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectModel(Player.name)
    private readonly playerModel: Model<Player>,
  ) {}

  async create(dto: Player): Promise<string | null> {
    try {
      const player = new this.playerModel(dto);
      await player.save();

      return player._id.toString();
    } catch (e) {
      console.log('PlayerRepository/create', e);
      return null;
    }
  }
}
