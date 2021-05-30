import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../shemas/category.shemas';

export class SearchDto {
  @ApiProperty({
    type: Category,
  })
  readonly categoryId: Category;
}
