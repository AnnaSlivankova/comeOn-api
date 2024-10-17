import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TokenBlackList } from '../domain/token-black-list.entity';

@Injectable()
export class TokensBlackListRepository {
  constructor(
    @InjectModel(TokenBlackList.name)
    private readonly tokenModel: Model<TokenBlackList>,
  ) {
  }

  async isTokenInBL(token: string): Promise<boolean> {
    try {
      const res = await this.tokenModel.findOne({ token }).exec();
      return !!res;
    } catch (e) {
      console.log('TokensBlackListRepository/isTokenInBL', e);
      throw new InternalServerErrorException();
    }
  }

  async putTokenInBL(token: string): Promise<boolean> {
    try {
      const tokenRecord = new this.tokenModel({ token });
      await tokenRecord.save();

      return !!tokenRecord._id.toString();
    } catch (e) {
      console.log('TokensBlackListRepository/putTokenInBL', e);
      return false;
    }
  }

  async putTokensInBL(tokens: TokenBlackList[]): Promise<boolean> {
    try {
      await this.tokenModel.insertMany(tokens);
      return true;
    } catch (e) {
      console.log('TokensBlackListRepository/putTokensInBL', e);
      return false;
    }
  }
}
