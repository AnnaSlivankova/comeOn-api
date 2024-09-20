import { Injectable } from '@nestjs/common';
import { PlayerRepository } from '../infrastructure/player.repository';
import { Player } from '../domain/player.entity';
import { CreatePlayerInputModel } from '../api/models/create-player.input.model';

@Injectable()
export class PlayerService {
  constructor(private playerRepository: PlayerRepository) {}

  async create(dto: CreatePlayerInputModel): Promise<string | null> {
    const player = new Player(dto);
    return await this.playerRepository.create(player);
  }
}
