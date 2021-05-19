import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument, User } from './shemas/user.shemas';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<any | undefined> {
    return await this.userModel.findOne({ email });
  }

  async create(userDto: CreateUserDto): Promise<User> {
    return
  }
}
