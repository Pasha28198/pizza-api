import * as mongoose from "mongoose";
export declare type CategoryDocument = Category & mongoose.Document;
export declare class Category {
    name: string;
}
export declare const CategoryShema: mongoose.Schema<mongoose.Document<Category, {}>, mongoose.Model<any, any>, undefined>;
