import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: String,
  })
  readonly fist_name: string;

  @ApiProperty({
    type: String,
  })
  readonly last_name: string;

  @ApiProperty({
    type: String,
  })
  readonly password: string;

  @ApiProperty({
    type: String
  })
  readonly email: string;
}
