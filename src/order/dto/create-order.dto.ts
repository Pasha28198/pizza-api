import { ApiProperty } from '@nestjs/swagger';
import { Choise } from '../../products/shemas/choise.shemas';

export class CreateOrderDto {
  @ApiProperty({
    type: {
      name: { type: String },
      phone: { type: String },
    },
  })
  readonly user: {
    name: string;
    phone: string;
  };

  @ApiProperty({
    type: {
      day: { type: String },
      time: { type: String },
    },
  })
  delivery_time: {
    day: string;
    time: string;
  };

  @ApiProperty({
    type: {
      city: { type: String },
      street: { type: String },
      house: { type: String },
      apartment: { type: String },
      floor: { type: String },
      entrance: { type: String },
      comment: { type: String },
    },
  })
  readonly address: {
    city: string;
    street: string;
    house: string;
    apartment: string;
    floor: string;
    entrance: string;
    comment: string;
  };

  @ApiProperty({
    type: [
      {
        quantity: { type: Number },
        product: { type: String },
        ingredients: { type: String },
      },
    ],
  })
  readonly products: {
    quantity: number;
    choise: Choise;
    ingredients: Array<string>;
  }[];
}
