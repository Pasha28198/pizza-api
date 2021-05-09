import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category';
import { CreateChoiseDto } from './dto/create-choise.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './shemas/product.shemas';

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService: ProductsService) {
        
    }

    @Get()
    getAll(): Promise<Product[]> {
        return this.productsService.getAll()
    }

    @Get(':id')
    getOne(@Param() params): Promise<Product> {
        return this.productsService.getById(params.id)
    }

    @Patch(':id')
    updateProduct(@Param() params, @Body() CreateProductDto: CreateProductDto) {
        return this.productsService.update(params.id, CreateProductDto)
    }

    @Post()
    create(@Body() CreateProductDto: CreateProductDto) {
        return this.productsService.create(CreateProductDto)
    }

    @Post('/choise')
    createChoise(@Body() CreateChoiseDto: CreateChoiseDto) {
        return this.productsService.createChoise(CreateChoiseDto)
    }

    @Post('/category')
    createCategory(@Body() CreateCategoryDto: CreateCategoryDto) {
        return this.productsService.createCategory(CreateCategoryDto)
    }
}
