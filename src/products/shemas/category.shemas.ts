import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { Product } from './product.shemas';
import { Choise } from './choise.shemas';

export type CategoryDocument = Category & mongoose.Document;

@Schema()
export class Category {
  @Prop({
    type: String,
  })
  name: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
  products: Product[];
}

export const CategoryShema = SchemaFactory.createForClass(Category);
