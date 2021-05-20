import * as mongoose from 'mongoose';
export declare type UserDocument = User & mongoose.Document;
export declare class User {
    fist_name: string;
    last_name: string;
    password: string;
    email: string;
}
export declare const UserShema: mongoose.Schema<mongoose.Document<User, {}>, mongoose.Model<any, any>, undefined>;
