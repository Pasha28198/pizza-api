import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Ingredient } from '../../products/shemas/ingredient.shemas';
import { Choise } from '../../products/shemas/choise.shemas';

export type OrderDocument = Order & mongoose.Document;

@Schema()
export class Order {
  @Prop({
    type: {
      user: {
        name: { type: String },
        phone: { type: String },
      },
    },
  })
  user: {
    name: string;
    phone: string;
  };

  @Prop({
    type: {
      delivery_time: {
        day: { type: String },
        time: { type: String },
      },
    },
  })
  delivery_time: {
    day: string;
    time: string;
  };

  @Prop({
    type: {
      address: {
        city: { type: String },
        street: { type: String },
        house: { type: String },
        apartment: { type: String },
        floor: { type: String },
        entrance: { type: String },
        comment: { type: String },
      },
    },
  })
  address: {
    city: string;
    street: string;
    house: string;
    apartment: string;
    floor: string;
    entrance: string;
    comment: string;
  };

  @Prop({
    type: [
      {
        quantity: { type: Number },
        choise: { type: mongoose.Schema.Types.ObjectId },
        ingredients: { type: [{ type: mongoose.Schema.Types.ObjectId }] },
      },
    ],
  })
  products: { quantity: number; choise: Choise; ingredients: Ingredient[] }[];
}

export const OrderShema = SchemaFactory.createForClass(Order);
