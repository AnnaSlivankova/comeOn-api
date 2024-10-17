import { forwardRef, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './domain/users.entity';
import { UsersController } from './api/users.controller';
import { UsersService } from './application/users.service';
import { UsersRepository } from './infrastructure/users.repository';
import { UsersQueryRepository } from './infrastructure/users-query-repository';
import { BcryptService } from 'src/infrastructure/services/bcrypt.service';
import { CronService } from '../../infrastructure/services/cron.service';
import { GameModule } from '../game/game.module';

@Module({
  imports: [
    MongooseModule.forFeature([entity(User, UserSchema)]),
    forwardRef(() => GameModule),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersRepository,
    UsersQueryRepository,
    BcryptService,
    CronService,
  ],
  exports: [UsersQueryRepository, UsersRepository, UsersService],
})
export class UsersModule {}

function entity(name: any, schema: any) {
  return {
    name: name.name,
    schema: schema,
  };
}
