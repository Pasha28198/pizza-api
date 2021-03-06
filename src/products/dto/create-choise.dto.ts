import { ApiProperty } from '@nestjs/swagger';

export class CreateChoiseDto {
  @ApiProperty({
    type: String,
  })
  readonly productId: string;

  @ApiProperty({
    type: String,
  })
  readonly mass: string;

  @ApiProperty({
    type: String,
  })
  readonly type: string;

  @ApiProperty({
    type: Number,
  })
  readonly price: number;
}
