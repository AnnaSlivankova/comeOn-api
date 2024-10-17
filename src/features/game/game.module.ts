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

@Module({
  imports: [
    MongooseModule.forFeature([entity(Player, PlayerSchema)]),
    AuthModule,
    UsersModule,
  ],
  controllers: [GameController],
  providers: [
    PlayerService,
    PlayerRepository,
    PlayerQueryRepository,
    CronService,
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
