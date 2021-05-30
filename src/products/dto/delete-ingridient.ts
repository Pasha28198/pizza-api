import { ApiProperty } from '@nestjs/swagger';

export class DeleteIngredientDto {
  @ApiProperty({
    type: String,
  })
  readonly productId: string;

  @ApiProperty({
    type: String,
  })
  readonly ingredientId: string;
}
