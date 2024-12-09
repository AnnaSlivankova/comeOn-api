import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { QuestionRepository } from '../infrastructure/question.repository';
import { CreateQuestionInputModel } from '../api/models/create-question.input.model';
import { Question } from '../domain/question.entity';
import { CreateAnswerInputModel } from '../api/models/create-answer.input.model';
import { AnswerRepository } from '../infrastructure/answer.repository';
import { Answer } from '../domain/answer.entity';
import { CreateInfoInputModel } from '../api/models/create-info.input.model';
import { Info } from '../domain/info.entity';
import { InfoRepository } from '../infrastructure/info.repository';
import { RightAnswersRepository } from '../infrastructure/right-answers.repository';
import { RightAnswer } from '../domain/right-answer.entity';

@Injectable()
export class QuizService {
  constructor(
    private questionRepository: QuestionRepository,
    private answerRepository: AnswerRepository,
    private infoRepository: InfoRepository,
    private rightAnswersRepository: RightAnswersRepository,
  ) {
  }

  async createQuestion(dto: CreateQuestionInputModel): Promise<string | null> {
    const question = new Question(dto);
    const questionId = await this.questionRepository.create(question);
    if (!questionId) {
      throw new InternalServerErrorException('questionId is null');
    }

    const ra = new RightAnswer(dto);
    const isRACreated = await this.rightAnswersRepository.create(ra);
    if (!isRACreated) {
      throw new InternalServerErrorException('isRACreated is false');
    }

    return questionId;
  }

  async createAnswer(dto: CreateAnswerInputModel): Promise<string | null> {
    const isAnswerAlreadyExists =
      await this.answerRepository.isAnswerAlreadyExists(
        dto.userId,
        dto.questionId,
      );

    if (isAnswerAlreadyExists) {
      throw new BadRequestException('Ты уже ответил на этот вопрос! Этот ответ не будет засчитан 🤷🏻‍♀️');
    }

    const answer = new Answer(dto);
    return await this.answerRepository.create(answer);
  }

  async createInfo(dto: CreateInfoInputModel): Promise<string | null> {
    const info = new Info(dto);
    return await this.infoRepository.create(info);
  }

  async getQuizInfo() {
    const info = await this.infoRepository.getInfo();
    return {
      targetDate: info[0].targetDate,
      bibleText: info[0].bibleText,
    };
  }

  async getRightAnswers() {
    const ra = await this.rightAnswersRepository.getRightAnswers();

    return ra.map(a => ({
      question: a.question,
      answer: a.answer,
      position: a.position,
    }));
  }

  async showRightAnswers(isOpen: boolean) {
    return await this.rightAnswersRepository.updateStatus(isOpen);
  }
}