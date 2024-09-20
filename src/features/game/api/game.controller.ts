import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PATH } from '../../../settings/app.settings';
import { CreatePlayerInputModel } from './models/create-player.input.model';
import { PlayerOutputModel } from './models/player.output.model';
import { PlayerService } from '../application/player.service';
import { PlayerQueryRepository } from '../infrastructure/player-query-repository';
import { ThrottlerGuard } from '@nestjs/throttler';
import { QueryParams } from '../../../infrastructure/models/query.params';
import { PaginationOutput } from '../../../infrastructure/models/pagination.output';

@UseGuards(ThrottlerGuard)
@Controller(PATH.GAME)
export class GameController {
  constructor(
    private playerService: PlayerService,
    private playerQueryRepository: PlayerQueryRepository,
  ) {}

  @Post()
  async createPlayer(
    @Body() inputDto: CreatePlayerInputModel,
  ): Promise<PlayerOutputModel> {
    const id = await this.playerService.create(inputDto);
    if (!id) throw new BadRequestException();

    const player = await this.playerQueryRepository.getById(id);
    if (!player) throw new BadRequestException();

    return player;
  }

  @Get()
  async getAllPlayers(
    @Query() query: QueryParams,
  ): Promise<PaginationOutput<PlayerOutputModel>> {
    const players = await this.playerQueryRepository.getAll(query);
    if (!players) throw new BadRequestException();
    return players;
  }
}
