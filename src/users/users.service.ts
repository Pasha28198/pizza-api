import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { UserDocument, User } from './shemas/user.shemas';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(email: string): Promise<any | undefined> {
    return await this.userModel.findOne({ email }).exec();
  }

  async create(userDto: CreateUserDto): Promise<User> {
    const hash = await bcrypt.hash(userDto.password, 10);
    const newUser = new this.userModel({
      ...userDto,
      password: hash,
    });
    return newUser.save();
  }

}
