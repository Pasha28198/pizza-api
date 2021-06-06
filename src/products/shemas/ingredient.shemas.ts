import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type IngredientDocument = Ingredient & mongoose.Document;

@Schema()
export class Ingredient {
  @Prop()
  name: string;

  @Prop()
  price: number;
  _id: any;
}

export const IngredientShema = SchemaFactory.createForClass(Ingredient);
