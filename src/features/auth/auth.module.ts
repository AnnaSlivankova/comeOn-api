import { Module } from '@nestjs/common';
import { AuthController } from './api/auth.controller';
import { UsersModule } from '../users/users.module';
import { BcryptService } from '../../infrastructure/services/bcrypt.service';
import { AuthService } from './application/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  TokenBlackList,
  TokenBlackListSchema,
} from './domain/token-black-list.entity';
import { TokensBlackListRepository } from './infrastructure/tokens-black-list.repository';

@Module({
  imports: [
    MongooseModule.forFeature([entity(TokenBlackList, TokenBlackListSchema)]),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, TokensBlackListRepository, BcryptService],
  exports: [TokensBlackListRepository, AuthService],
})
export class AuthModule {
}

function entity(name: any, schema: any) {
  return {
    name: name.name,
    schema: schema,
  };
}
