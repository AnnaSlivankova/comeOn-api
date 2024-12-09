import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
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
import { AuthBearerGuard } from '../../../infrastructure/guards/auth.bearer.guard';
import { UpdatePlayerInputModel } from './models/update-player.input.model';
import { AuthBasicGuard } from '../../../infrastructure/guards/auth.basic.guard';
import { CreatePlayerByAdminInputModel } from './models/create-player-by-admin.input.model';

@UseGuards(ThrottlerGuard)
@Controller(PATH.GAME)
export class GameController {
  constructor(
    private playerService: PlayerService,
    private playerQueryRepository: PlayerQueryRepository,
  ) {
  }

  @UseGuards(AuthBasicGuard)
  @Post('admin/player')
  async createPlayerByAdmin(
    @Body() inputDto: CreatePlayerByAdminInputModel,
  ): Promise<PlayerOutputModel> {
    const id = await this.playerService.createByAdmin(inputDto);
    if (!id) throw new BadRequestException();

    const player = await this.playerQueryRepository.getById(id);
    if (!player) throw new BadRequestException();

    return player;
  }

  @UseGuards(AuthBearerGuard)
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

  @UseGuards(AuthBearerGuard)
  @Post(':id')
  async updatePlayer(
    @Param('id') id: string,
    @Body() inputDto: UpdatePlayerInputModel,
  ): Promise<PlayerOutputModel> {
    const playerId = await this.playerService.update(inputDto);
    if (!playerId) throw new BadRequestException();

    const player = await this.playerQueryRepository.getById(playerId);
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

  @Get(':id')
  async getPlayerById(@Param('id') id: string): Promise<PlayerOutputModel> {
    const player = await this.playerQueryRepository.getById(id);
    if (!player) throw new BadRequestException();

    return player;
  }

  @Get('/ping')
  async ping(): Promise<boolean> {
    return true;
  }
}
