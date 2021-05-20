import * as mongoose from 'mongoose';
import { Category } from './category.shemas';
import { Choise } from './choise.shemas';
export declare type ProductDocument = Product & mongoose.Document;
export declare class Product {
    title: string;
    description: string;
    choise: Choise[];
    category: Category;
}
export declare const ProductShema: mongoose.Schema<mongoose.Document<Product, {}>, mongoose.Model<any, any>, undefined>;
