import * as mongoose from 'mongoose';
export declare type AddressDocument = Address & mongoose.Document;
export declare class Address {
    city: string;
    street: string;
    house: string;
    apartment: string;
    floor: string;
    entrance: string;
    comment: string;
}
export declare const AddressShema: mongoose.Schema<mongoose.Document<Address, {}>, mongoose.Model<any, any>, undefined>;
