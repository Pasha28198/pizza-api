import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../shemas/category.shemas';

export class CreateProductDto {
  @ApiProperty({
    type: String,
  })
  readonly title: string;

  @ApiProperty({
    type: String,
  })
  readonly description: string;

  @ApiProperty({
    type: Category,
    required: true,
  })
  readonly categoryId: Category;
}
