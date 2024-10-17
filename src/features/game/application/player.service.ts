import { BadRequestException, Injectable } from '@nestjs/common';
import { PlayerRepository } from '../infrastructure/player.repository';
import { Player } from '../domain/player.entity';
import { CreatePlayerInputModel } from '../api/models/create-player.input.model';
import { UpdatePlayerInputModel } from '../api/models/update-player.input.model';
import { calculatePlayerRating } from './calculate-player-rating';

@Injectable()
export class PlayerService {
  constructor(private playerRepository: PlayerRepository) {
  }

  async create(dto: CreatePlayerInputModel): Promise<string | null> {
    const { userId } = dto;
    const player = await this.playerRepository.getOneByUserId(userId);
    if (!player) {
      const newPlayer = new Player({ userId, gamesCount: 1, totalScore: 0 });
      return await this.playerRepository.create(newPlayer);
    }

    if (player.gamesCount === 3) throw new BadRequestException('max attempts count');

    player.updatePlayerGamesCount();
    await this.playerRepository.update(player);
    return player._id.toString();
  }

  async update(dto: UpdatePlayerInputModel): Promise<string | null> {
    const { userId, time, score } = dto;
    const player = await this.playerRepository.getOneByUserId(userId);
    if (!player) throw new BadRequestException();

    const gameScore = calculatePlayerRating(score, time);
    let totalScore: number;

    if (player.gamesCount === 1) {
      totalScore = gameScore;
    } else {
      const prevRes = player.totalScore * (player.gamesCount - 1);
      const sumScore = prevRes + gameScore;
      totalScore = sumScore / player.gamesCount;
    }

    player.updatePlayerTotalScore(+totalScore.toFixed());
    await this.playerRepository.update(player);

    return player._id.toString();
  }

  async resetPlayersData() {
    const players = await this.playerRepository.getAll();
    if (!players) throw new BadRequestException();

    players.forEach((p) => {
      p.prevGamesScore = p.prevGamesScore + p.totalScore;
      p.gamesCount = 0;
      p.totalScore = 0;
    });

    await this.playerRepository.updatePlayers(players);
  }
}
