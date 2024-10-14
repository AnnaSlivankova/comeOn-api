import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  QueryParams,
  SortDirection,
} from '../../../infrastructure/models/query.params';
import { PaginationOutput } from '../../../infrastructure/models/pagination.output';
import { Player } from '../domain/player.entity';
import {
  PlayerOutputModel,
  playerOutputModelMapper,
} from '../api/models/player.output.model';

@Injectable()
export class PlayerQueryRepository {
  constructor(
    @InjectModel(Player.name)
    private readonly playerModel: Model<Player>,
  ) {}

  async getById(id: string): Promise<PlayerOutputModel | null> {
    try {
      const player = await this.playerModel.findById(id, { __v: false }).exec();

      if (!player) return null;

      return playerOutputModelMapper(player);
    } catch (e) {
      console.log('PlayerQueryRepository/getById', e);
      return null;
    }
  }

  async getAll(
    query: QueryParams,
  ): Promise<null | PaginationOutput<PlayerOutputModel>> {
    try {
      const { searchNameTerm, pageSize, pageNumber, sortDirection, sortBy } =
        query;

      const filter: any = {};
      if (searchNameTerm) {
        filter.$and = [];
        if (searchNameTerm) {
          const queryName = new RegExp(searchNameTerm, 'i');
          filter.$and.push({ title: { $regex: queryName } });
        }
      }

      const sortOptions = {};
      sortOptions[sortBy] = sortDirection === SortDirection.ASC ? 1 : -1;

      const count = await this.playerModel.countDocuments(filter);

      const players = await this.playerModel
        .find(filter)
        .sort(sortOptions)
        // .skip((pageNumber - 1) * pageSize)
        // .limit(pageSize)
        .exec();

      if (!players) return null;

      return new PaginationOutput<PlayerOutputModel>(
        pageNumber,
        pageSize,
        count,
        players.map(playerOutputModelMapper),
      );
    } catch (e) {
      console.log('PlayerQueryRepository/getAll', e);
      return null;
    }
  }
}
