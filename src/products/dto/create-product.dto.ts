import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({
        type: String
    })
    readonly title: string

    @ApiProperty({
        type: String
    })
    readonly description: string

    @ApiProperty({
        type: String
    })
    readonly category: string
}