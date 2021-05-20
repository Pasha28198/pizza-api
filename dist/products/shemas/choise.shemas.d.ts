import * as mongoose from "mongoose";
import { Product } from "./product.shemas";
export declare type ChoiseDocument = Choise & mongoose.Document;
export declare class Choise {
    mass: string;
    type: string;
    price: number;
    product: Product;
}
export declare const ChoiseShema: mongoose.Schema<mongoose.Document<Choise, {}>, mongoose.Model<any, any>, undefined>;
