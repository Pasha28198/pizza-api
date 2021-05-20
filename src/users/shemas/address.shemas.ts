import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type AddressDocument = Address & mongoose.Document;

@Schema()
export class Address {
  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  street: string;

  @Prop({ required: true })
  house: string;

  @Prop({ required: true })
  apartment: string;

  @Prop({ required: true })
  floor: string;

  @Prop({ required: true })
  entrance: string;

  @Prop({ required: true })
  comment: string;
}

export const AddressShema = SchemaFactory.createForClass(Address);
