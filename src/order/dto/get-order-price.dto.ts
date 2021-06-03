import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../products/shemas/product.shemas';

export class GetOrderPriceDto {
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
    product: Product;
    ingredients: Array<string>;
  }[];
}
