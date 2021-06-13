import { ApiProperty } from '@nestjs/swagger';

export class IngredientDto {
  @ApiProperty({
    type: String,
  })
  readonly name: string;

  @ApiProperty({
    type: Number,
  })
  readonly mass: number;

  @ApiProperty({
    type: Number,
  })
  readonly price: number;
}
