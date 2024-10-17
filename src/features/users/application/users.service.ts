import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersRepository } from '../infrastructure/users.repository';
import { CreateUserInputModel } from '../api/models/create-user.input.model';
import { BcryptService } from '../../../infrastructure/services/bcrypt.service';
import { User } from '../domain/users.entity';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private bcryptService: BcryptService,
  ) {
  }

  async create(dto: CreateUserInputModel): Promise<string | null> {
    const { name, surname, password } = dto;
    const hash = await this.bcryptService.generateHash(password);
    const user = new User({ name, surname, hash, rating: 0 });

    return await this.usersRepository.create(user);
  }

  async addBonusRating(userId: string, bonus: number): Promise<boolean> {
    const user = await this.usersRepository.getUserById(userId);
    if (!user) throw new BadRequestException();
    user.rating = user.rating + bonus;
    return await this.usersRepository.updateUser(user);
  }

  async updateUsersPosition() {
    const users = await this.usersRepository.getAll();
    if (!users || users.length === 0) throw new BadRequestException('No users found');

    users.forEach((u, i) => {
      u.position = i + 1;
    });

    return await this.usersRepository.updateUsersPosition(users);
  }
}
