import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

export type CategoryDocument = Category & mongoose.Document

@Schema()
export class Category {
    @Prop()
    name: string
}

export const CategoryShema = SchemaFactory.createForClass(Category)