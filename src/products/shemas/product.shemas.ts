import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Category } from './category.shemas';
import { Choise } from './choise.shemas';

export type ProductDocument = Product & mongoose.Document;

@Schema()
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Choise' }] })
  choise: Choise[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
  })
  categoryId: Category;
}

export const ProductShema = SchemaFactory.createForClass(Product);
