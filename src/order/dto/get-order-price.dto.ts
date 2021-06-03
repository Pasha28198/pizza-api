import { ApiProperty } from '@nestjs/swagger';
import { Choise } from '../../products/shemas/choise.shemas';

export class GetOrderPriceDto {
  @ApiProperty({
    type: [
      {
        quantity: { type: Number },
        choise: { type: String },
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
