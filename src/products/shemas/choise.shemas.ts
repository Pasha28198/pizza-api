import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Product } from './product.shemas';

export type ChoiseDocument = Choise & mongoose.Document;

@Schema()
export class Choise {
  @Prop()
  mass: string;

  @Prop()
  type: string;

  @Prop()
  price: number;

  @Prop({ type: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' } })
  product: Product;
}

export const ChoiseShema = SchemaFactory.createForClass(Choise);
