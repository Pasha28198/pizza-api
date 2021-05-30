import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category';
import { CreateChoiseDto } from './dto/create-choise.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { SearchDto } from './dto/search-product.dto';
import { ProductsService } from './products.service';
import { Product } from './shemas/product.shemas';
import { Category } from './shemas/category.shemas';
import { Ingredient } from './shemas/ingredient.shemas';
import { IngredientDto } from './dto/create-ingredient.dto';
import { AddIngredientDto } from './dto/add-ingredient.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/categories')
  getCategories(): Promise<Category[]> {
    return this.productsService.getCategories();
  }

  @Get('/ingredients')
  getIngredients(): Promise<Ingredient[]> {
    return this.productsService.getIngredients();
  }

  @Post('/search')
  searchProducts(@Body() search: SearchDto): Promise<Product[]> {
    return this.productsService.searchProducts(search);
  }

  @Get(':id')
  getOne(@Param() params): Promise<Product> {
    return this.productsService.getById(params.id);
  }

  @Patch(':id')
  updateProduct(@Param() params, @Body() CreateProductDto: CreateProductDto) {
    return this.productsService.update(params.id, CreateProductDto);
  }

  @Post()
  create(@Body() CreateProductDto: CreateProductDto) {
    return this.productsService.create(CreateProductDto);
  }

  @Post('/choise')
  createChoise(@Body() CreateChoiseDto: CreateChoiseDto) {
    return this.productsService.createChoise(CreateChoiseDto);
  }

  @Post('/category')
  createCategory(@Body() CreateCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(CreateCategoryDto);
  }

  @Post('/ingredients')
  createIngredient(@Body() CreateIngredientDto: IngredientDto) {
    return this.productsService.createIngredient(CreateIngredientDto);
  }

  @Post('/ingredients/add')
  addIngredient(@Body() addIngredientDto: AddIngredientDto) {
    return this.productsService.addIngredient(addIngredientDto);
  }

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }
}
