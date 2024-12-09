import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RightAnswer } from '../domain/right-answer.entity';

@Injectable()
export class RightAnswersRepository {
  constructor(
    @InjectModel(RightAnswer.name)
    private readonly rightAnswerModel: Model<RightAnswer>,
  ) {
  }

  async create(dto: RightAnswer) {
    try {
      const ra = new this.rightAnswerModel(dto);
      await ra.save();

      return !!ra._id.toString();
    } catch (e) {
      console.log('RightAnswersRepository/create', e);
      return null;
    }
  }

  async updateStatus(isOpen: boolean) {
    try {
      const isUpdated = await this.rightAnswerModel
        .updateMany({}, { isOpen })
        .exec();

      return !!isUpdated.modifiedCount;
    } catch (e) {
      console.log('RightAnswersRepository/updateStatus', e);
      throw new InternalServerErrorException();
    }
  }

  async getRightAnswers() {
    try {
      const ra = await this.rightAnswerModel
        .find()
        .where({ isOpen: true })
        .sort({ position: 'asc' })
        .exec();

      return ra;
    } catch (e) {
      console.log('RightAnswersRepository/getRightAnswers', e);
      throw new InternalServerErrorException();
    }
  }
}
