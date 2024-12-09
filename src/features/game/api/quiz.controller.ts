import { BadRequestException, Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { PATH } from '../../../settings/app.settings';
import { PlayerService } from '../application/player.service';
import { AuthBasicGuard } from '../../../infrastructure/guards/auth.basic.guard';
import { CreateQuestionInputModel } from './models/create-question.input.model';
import { QuizService } from '../application/quiz.service';
import { QuestionOutputModel } from './models/question.output.model';
import { AuthBearerGuard } from '../../../infrastructure/guards/auth.bearer.guard';
import { QuestionQueryRepository } from '../infrastructure/question-query-repository';
import { CreateAnswerInputModel } from './models/create-answer.input.model';
import { AnswerOutputModel } from './models/answer.output.model';
import { AnswerRepository } from '../infrastructure/answer.repository';
import { Request } from 'express';
import { CreateInfoInputModel } from './models/create-info.input.model';
import { ShowRightAnswersInputModel } from './models/show-right-answers.input.model';

@UseGuards(ThrottlerGuard)
@Controller(PATH.QUIZ)
export class QuizController {
  constructor(
    private playerService: PlayerService,
    private quizService: QuizService,
    private questionQueryRepository: QuestionQueryRepository,
    private answerRepository: AnswerRepository,
  ) {
  }

  @UseGuards(AuthBasicGuard)
  @Post('admin/question')
  async createQuestion(
    @Body() dto: CreateQuestionInputModel,
  ): Promise<{ questionId: string }> {
    const questionId = await this.quizService.createQuestion(dto);
    if (!questionId) throw new BadRequestException();

    return { questionId };
  }

  @UseGuards(AuthBasicGuard)
  @Post('admin/right-answers')
  async showRightAnswers(
    @Body() dto: ShowRightAnswersInputModel,
  ) {
    const isShow = await this.quizService.showRightAnswers(dto.isOpen);
    if (!isShow) throw new BadRequestException();
    return;
  }

  @UseGuards(AuthBasicGuard)
  @Get('admin/answers')
  async getAllPlayersAnswers(): Promise<AnswerOutputModel[]> {
    const answers = await this.answerRepository.getAnswers();
    if (!answers) throw new BadRequestException();

    return answers;
  }

  @UseGuards(AuthBasicGuard)
  @Post('admin/info')
  async createQuizInfo(
    @Body() dto: CreateInfoInputModel,
  ) {
    const infoId = await this.quizService.createInfo(dto);
    if (!infoId) throw new BadRequestException();

    return { infoId };
  }

  @UseGuards(AuthBasicGuard)
  @Get('admin/answers/:userId')
  async getAnswersByUserId(
    @Param('userId') userId: string,
  ): Promise<AnswerOutputModel[]> {
    const answers = await this.answerRepository.getAnswersByUserId(userId);
    if (!answers) throw new BadRequestException();
    return answers;
  }

  @UseGuards(AuthBearerGuard)
  @Get('questions')
  async getQuestions(): Promise<QuestionOutputModel[]> {
    const questions = await this.questionQueryRepository.getAll();
    if (!questions) throw new BadRequestException();
    return questions;
  }

  // @UseGuards(AuthBearerGuard)
  @Get('info')
  async getQuizInfo() {
    const info = await this.quizService.getQuizInfo();
    if (!info) throw new BadRequestException();
    return info;
  }

  @Get('right-answers')
  async getRightAnswers() {
    const ra = await this.quizService.getRightAnswers();
    if (!ra) throw new BadRequestException();
    return ra;
  }

  @UseGuards(AuthBearerGuard)
  @Post('answer')
  async createAnswer(
    @Body() dto: CreateAnswerInputModel,
  ): Promise<{ answerId: string }> {
    const answerId = await this.quizService.createAnswer(dto);
    if (!answerId) throw new BadRequestException();

    return { answerId };
  }
}
