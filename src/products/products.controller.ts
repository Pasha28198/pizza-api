import { Body, Controller, Get, Param, Patch, Post, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
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
import { DeleteIngredientDto } from './dto/delete-ingridient';

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

  @Delete('/ingredients/delete')
  delete(@Body() id: string) {
    return this.productsService.deleteProduct(id);
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

  @Delete('/ingredients')
  deleteIngredientById(@Body() id: string) {
    return this.productsService.deleteIngredientById(id);
  }

  @Post('/ingredients/add')
  addIngredient(@Body() addIngredientDto: AddIngredientDto) {
    return this.productsService.addIngredient(addIngredientDto);
  }

  @Delete('/ingredients/delete')
  deleteIngredient(@Body() deleteIngredientDto: DeleteIngredientDto) {
    return this.productsService.deleteIngredient(deleteIngredientDto);
  }

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }
}
