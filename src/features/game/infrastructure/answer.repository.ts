import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Answer } from '../domain/answer.entity';
import {
  AnswerOutputModel,
  answerOutputModelMapper,
} from '../api/models/answer.output.model';

@Injectable()
export class AnswerRepository {
  constructor(
    @InjectModel(Answer.name)
    private readonly answerModel: Model<Answer>,
  ) {
  }

  async create(dto: Answer): Promise<string | null> {
    try {
      const answer = new this.answerModel(dto);
      await answer.save();

      return answer._id.toString();
    } catch (e) {
      console.log('AnswerRepository/create', e);
      return null;
    }
  }

  async getAnswers(): Promise<AnswerOutputModel[]> {
    try {
      const answers = await this.answerModel
        .find()
        // .sort({ userId: 'asc', day: 'asc', position: 'asc' })
        .sort({ createdAt: 'asc', day: 'asc', position: 'asc' })
        .populate({
          path: 'userId',
          model: 'User',
        })
        .populate({
          path: 'questionId',
          model: 'Question',
        })
        .exec();

      if (!answers) return null;

      return answers.map(answerOutputModelMapper);
    } catch (e) {
      console.log('AnswerRepository/getAnswers', e);
      return null;
    }
  }

  async getAnswersByUserId(userId: string): Promise<AnswerOutputModel[]> {
    try {
      const answers = await this.answerModel
        .find()
        .where({ userId })
        .sort({ day: 'asc', position: 'asc' })
        .populate({
          path: 'userId',
          model: 'User',
        })
        .populate({
          path: 'questionId',
          model: 'Question',
        })
        .exec();

      if (!answers) return null;

      return answers.map(answerOutputModelMapper);
    } catch (e) {
      console.log('AnswerRepository/getAnswersByUserId', e);
      return null;
    }
  }

  async isAnswerAlreadyExists(
    userId: string,
    questionId: string,
  ): Promise<boolean> {
    try {
      const answer = await this.answerModel
        .findOne()
        .where({ userId, questionId })
        .exec();

      if (!answer) return false;

      return !!answer;
    } catch (e) {
      console.log('AnswerRepository/isAnswerAlreadyExists', e);
      // return false;
      throw new InternalServerErrorException();
    }
  }
}
