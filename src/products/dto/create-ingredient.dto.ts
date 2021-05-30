import { ApiProperty } from '@nestjs/swagger';

export class IngredientDto {
  @ApiProperty({
    type: String,
  })
  readonly name: string;

  @ApiProperty({
    type: String,
  })
  readonly price: number;
}
