import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from '../domain/question.entity';

@Injectable()
export class QuestionRepository {
  constructor(
    @InjectModel(Question.name)
    private readonly questionModel: Model<Question>,
  ) {
  }

  async create(dto: Question): Promise<string | null> {
    try {
      const question = new this.questionModel(dto);
      await question.save();

      return question._id.toString();
    } catch (e) {
      console.log('QuestionRepository/create', e);
      return null;
    }
  }
}
