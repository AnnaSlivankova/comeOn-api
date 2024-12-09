import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Info } from '../domain/info.entity';

@Injectable()
export class InfoRepository {
  constructor(
    @InjectModel(Info.name)
    private readonly infoModel: Model<Info>,
  ) {
  }

  async create(dto: Info): Promise<string | null> {
    try {
      const info = new this.infoModel(dto);
      await info.save();

      return info._id.toString();
    } catch (e) {
      console.log('InfoRepository/create', e);
      return null;
    }
  }

  async getInfo() {
    try {
      return await this.infoModel
        .find()
        .exec();
    } catch (e) {
      console.log('InfoRepository/getInfo', e);
      throw new InternalServerErrorException();
    }
  }
}
