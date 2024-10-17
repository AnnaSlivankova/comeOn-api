import { Injectable } from '@nestjs/common';
import { User, UserDocument } from '../domain/users.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async create(dto: User): Promise<string | null> {
    try {
      const user = new this.userModel(dto);
      await user.save();

      return user._id.toString();
    } catch (e) {
      console.log('UsersRepository/create', e);
      return null;
    }
  }

  async getUserByFullName(
    name: string,
    surname: string,
  ): Promise<UserDocument | null> {
    try {
      return await this.userModel.findOne({ name, surname });
    } catch (e) {
      console.log('UsersRepository/getUserByFullName', e);
      return null;
    }
  }

  async getUserById(id: string): Promise<UserDocument | null> {
    try {
      return await this.userModel.findById(id);
    } catch (e) {
      console.log('UsersRepository/getUserById', e);
      return null;
    }
  }

  async getAll(): Promise<null | UserDocument[]> {
    try {
      const users = await this.userModel.find().sort({ rating: -1 }).exec();
      if (!users) return null;
      return users;
    } catch (e) {
      console.log('UsersRepository/getAll', e);
      return null;
    }
  }

  async updateUsersPosition(users: UserDocument[]): Promise<boolean> {
    try {
      const res = await this.userModel.bulkSave(users);
      if (!res) return false;
      return true;
    } catch (e) {
      console.log('UsersRepository/updateUsersPosition', e);
      return false;
    }
  }

  async updateUser(user: UserDocument): Promise<boolean> {
    try {
      const res = await this.userModel.updateOne({ _id: user._id }, user);
      if (!res) return false;
      return true;
    } catch (e) {
      console.log('UsersRepository/updateUser', e);
      return false;
    }
  }
}
