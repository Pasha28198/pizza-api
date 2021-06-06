import { ApiProperty } from '@nestjs/swagger';

export class AddIngredientDto {
  @ApiProperty({
    type: String,
  })
  readonly productId: string;

  @ApiProperty({
    type: String,
  })
  readonly ingredientId: string;

  @ApiProperty({
    type: Number,
  })
  readonly count: number;
}
