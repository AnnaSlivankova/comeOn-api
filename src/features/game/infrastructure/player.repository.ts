import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from '../domain/player.entity';

@Injectable()
export class PlayerRepository {
  constructor(
    @InjectModel(Player.name)
    private readonly playerModel: Model<Player>,
  ) {
  }

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

  async update(dto: Player): Promise<boolean> {
    try {
      const res = await this.playerModel.updateOne({ userId: dto.userId }, dto);
      return !!res.modifiedCount;
    } catch (e) {
      console.log('PlayerRepository/update', e);
      throw new BadRequestException('PlayerRepository/update error');
    }
  }

  async getOneByUserId(userId: string): Promise<PlayerDocument | null> {
    try {
      return await this.playerModel.findOne({ userId });
    } catch (e) {
      console.log('PlayerRepository/getOneById', e);
      throw new BadRequestException('PlayerRepository/getOneById error');
    }
  }

  async getAll(): Promise<null | PlayerDocument[]> {
    try {
      const players = await this.playerModel.find().exec();
      if (!players) return null;

      return players;
    } catch (e) {
      console.log('PlayerRepository/getAll', e);
      return null;
    }
  }

  async updatePlayers(players: PlayerDocument[]): Promise<boolean> {
    try {
      const res = await this.playerModel.bulkSave(players);
      if (!res) return false;
      return true;
    } catch (e) {
      console.log('PlayerRepository/updatePlayers', e);
      throw new BadRequestException('PlayerRepository/updatePlayers error');
    }
  }
}
