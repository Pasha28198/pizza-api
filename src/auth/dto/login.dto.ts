import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    type: String,
  })
  readonly password: string;

  @ApiProperty({
    type: String,
  })
  readonly email: string;
}
