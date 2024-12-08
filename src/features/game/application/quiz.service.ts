import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionRepository } from '../infrastructure/question.repository';
import { CreateQuestionInputModel } from '../api/models/create-question.input.model';
import { Question } from '../domain/question.entity';
import { CreateAnswerInputModel } from '../api/models/create-answer.input.model';
import { AnswerRepository } from '../infrastructure/answer.repository';
import { Answer } from '../domain/answer.entity';

@Injectable()
export class QuizService {
  constructor(
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
  ) {
  }

  async createQuestion(dto: CreateQuestionInputModel): Promise<string | null> {
    const question = new Question(dto);
    return await this.questionRepository.create(question);
  }

  async createAnswer(dto: CreateAnswerInputModel): Promise<string | null> {
    const isAnswerAlreadyExists =
      await this.answerRepository.isAnswerAlreadyExists(
        dto.userId,
        dto.questionId,
      );
    console.log('isAnswerAlreadyExists', isAnswerAlreadyExists);

    if (isAnswerAlreadyExists) {
      throw new BadRequestException('Ты уже ответил на этот вопрос! Этот ответ не будет засчитан 🤷🏻‍♀️');
    }

    const answer = new Answer(dto);
    return await this.answerRepository.create(answer);
  }
}