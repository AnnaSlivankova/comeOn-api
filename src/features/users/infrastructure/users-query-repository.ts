import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../domain/users.entity';
import { Model } from 'mongoose';
import {
  UserOutputModel,
  userOutputModelMapper,
} from '../api/models/user.output.model';
import {
  QueryParams,
  SortDirection,
} from '../../../infrastructure/models/query.params';
import { PaginationOutput } from '../../../infrastructure/models/pagination.output';

@Injectable()
export class UsersQueryRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {
  }

  async getById(id: string): Promise<UserOutputModel | null> {
    try {
      const user = await this.userModel.findById(id, { __v: false }).exec();
      if (!user) return null;

      return userOutputModelMapper(user);
    } catch (e) {
      console.log('UsersQueryRepository/getById', e);
      return null;
    }
  }

  async getAll(
    query: QueryParams,
  ): Promise<null | PaginationOutput<UserOutputModel>> {
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

      const count = await this.userModel.countDocuments(filter);

      const players = await this.userModel
        .find(filter)
        .sort(sortOptions)
        // .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .exec();

      if (!players) return null;

      return new PaginationOutput<UserOutputModel>(
        pageNumber,
        pageSize,
        count,
        players.map(userOutputModelMapper),
      );
    } catch (e) {
      console.log('UsersQueryRepository/getAll', e);
      return null;
    }
  }
}
