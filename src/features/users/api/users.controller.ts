import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PATH } from '../../../settings/app.settings';
import { QueryParams } from '../../../infrastructure/models/query.params';
import { PaginationOutput } from '../../../infrastructure/models/pagination.output';
import { CreateUserInputModel } from './models/create-user.input.model';
import { UsersService } from '../application/users.service';
import { AuthBasicGuard } from '../../../infrastructure/guards/auth.basic.guard';
import { UsersQueryRepository } from '../infrastructure/users-query-repository';
import { UserOutputModel } from './models/user.output.model';

@Controller(PATH.USERS)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private usersQueryRepository: UsersQueryRepository,
  ) {
  }

  @UseGuards(AuthBasicGuard)
  @Post()
  async createUserByAdmin(
    @Body() inputDto: CreateUserInputModel,
  ): Promise<UserOutputModel> {
    const id = await this.usersService.create(inputDto);
    if (!id) throw new BadRequestException();

    const user = await this.usersQueryRepository.getById(id);
    if (!user) throw new BadRequestException();

    return user;
  }

  @UseGuards(AuthBasicGuard)
  @Post('update-position')
  async updateUsersPosition() {
    return await this.usersService.updateUsersPosition();
  }

  @Get()
  async getAllUsers(
    @Query() query: QueryParams,
  ): Promise<PaginationOutput<UserOutputModel>> {
    const users = await this.usersQueryRepository.getAll(query);
    if (!users) throw new BadRequestException();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserOutputModel> {
    const user = await this.usersQueryRepository.getById(id);
    if (!user) throw new BadRequestException();
    return user;
  }

  @UseGuards(AuthBasicGuard)
  @Post(':id')
  @HttpCode(204)
  async addUserBonus(@Param('id') id: string, @Body() dto: { bonus: number }) {
    const isBonusAdd = await this.usersService.addBonusRating(id, dto.bonus);
    if (!isBonusAdd) throw new BadRequestException();
    return;
  }
}
