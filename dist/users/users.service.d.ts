import { Model } from 'mongoose';
import { UserDocument, User } from './shemas/user.shemas';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    findOne(email: string): Promise<any | undefined>;
    create(userDto: CreateUserDto): Promise<User>;
}
