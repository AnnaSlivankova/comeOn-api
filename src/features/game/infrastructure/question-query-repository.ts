import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../domain/question.entity';
import {
  QuestionOutputModel,
  questionOutputModelMapper,
} from '../api/models/question.output.model';

@Injectable()
export class QuestionQueryRepository {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<Question>,
  ) {}

  async getAll(): Promise<null | QuestionOutputModel[]> {
    try {
      const questions = await this.questionModel
        .find()
        .sort({ position: 'asc' })
        .exec();

      if (!questions) return null;

      return questions.map(questionOutputModelMapper);
    } catch (e) {
      console.log('QuestionQueryRepository/getAll', e);
      return null;
    }
  }
}
