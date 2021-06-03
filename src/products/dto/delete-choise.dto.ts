import { ApiProperty } from '@nestjs/swagger';

export class DeleteChoiseDto {
  @ApiProperty({
    type: String,
  })
  readonly id: string;
}
