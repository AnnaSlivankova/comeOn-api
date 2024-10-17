import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UsersService } from '../../features/users/application/users.service';
import { PlayerService } from '../../features/game/application/player.service';

@Injectable()
export class CronService {
  constructor(
    private usersService: UsersService,
    private playerService: PlayerService,
  ) {
  }

  @Cron(CronExpression.EVERY_WEEK)
  async updateUsersPosition() {
    await this.usersService.updateUsersPosition();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updatePlayersData() {
    await this.playerService.resetPlayersData();
  }

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // // @Cron(CronExpression.EVERY_5_MINUTES)
  // async test() {
  //   await this.usersService.updateUsersPosition()
  //   // await this.playerService.resetPlayersData();
  //   console.log('cron');
  // }
}
