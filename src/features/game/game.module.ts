import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerRepository } from './infrastructure/player.repository';
import { PlayerQueryRepository } from './infrastructure/player-query-repository';
import { GameController } from './api/game.controller';
import { Player, PlayerSchema } from './domain/player.entity';
import { PlayerService } from './application/player.service';
import { AuthModule } from '../auth/auth.module';
import { CronService } from '../../infrastructure/services/cron.service';
import { UsersModule } from '../users/users.module';
import { QuizController } from './api/quiz.controller';
import { Question, QuestionSchema } from './domain/question.entity';
import { QuizService } from './application/quiz.service';
import { QuestionRepository } from './infrastructure/question.repository';
import { QuestionQueryRepository } from './infrastructure/question-query-repository';
import { AnswerRepository } from './infrastructure/answer.repository';
import { Answer, AnswerSchema } from './domain/answer.entity';
import { Info, InfoSchema } from './domain/info.entity';
import { InfoRepository } from './infrastructure/info.repository';
import { RightAnswer, RightAnswerSchema } from './domain/right-answer.entity';
import { RightAnswersRepository } from './infrastructure/right-answers.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      entity(Player, PlayerSchema),
      entity(Question, QuestionSchema),
      entity(Answer, AnswerSchema),
      entity(Info, InfoSchema),
      entity(RightAnswer, RightAnswerSchema),
    ]),
    AuthModule,
    UsersModule,
  ],
  controllers: [GameController, QuizController],
  providers: [
    PlayerService,
    PlayerRepository,
    PlayerQueryRepository,
    CronService,
    QuizService,
    QuestionRepository,
    QuestionQueryRepository,
    AnswerRepository,
    InfoRepository,
    RightAnswersRepository,
  ],
  exports: [PlayerRepository, PlayerQueryRepository, PlayerService],
})
export class GameModule {
}

function entity(name: any, schema: any) {
  return {
    name: name.name,
    schema: schema,
  };
}
