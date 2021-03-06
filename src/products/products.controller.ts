import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Delete,
  UseInterceptors,
  UploadedFile, UseGuards,
} from '@nestjs/common';
// import pathParse from 'path-parse';
import { parse } from 'path';
import { v4 as uuidv4 } from 'uuid';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

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
import { diskStorage } from 'multer';
import { DeleteChoiseDto } from './dto/delete-choise.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateProduct(@Param() params, @Body() CreateProductDto: CreateProductDto) {
    return this.productsService.update(params.id, CreateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() CreateProductDto: CreateProductDto) {
    return this.productsService.create(CreateProductDto);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('/ingredients/delete')
  deleteIngredient(@Body() deleteIngredientDto: DeleteIngredientDto) {
    return this.productsService.deleteIngredient(deleteIngredientDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Delete('/ingredients/delete')
  // delete(@Body() id: string) {
  //   return this.productsService.deleteProduct(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Delete('/choise')
  deleteChoise(@Body() DeleteChoiseDto: DeleteChoiseDto) {
    return this.productsService.deleteChoise(DeleteChoiseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/choise')
  createChoise(@Body() CreateChoiseDto: CreateChoiseDto) {
    return this.productsService.createChoise(CreateChoiseDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/category')
  createCategory(@Body() CreateCategoryDto: CreateCategoryDto) {
    return this.productsService.createCategory(CreateCategoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/ingredients')
  createIngredient(@Body() CreateIngredientDto: IngredientDto) {
    return this.productsService.createIngredient(CreateIngredientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/ingredients')
  deleteIngredientById(@Body() id: string) {
    return this.productsService.deleteIngredientById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/ingredients/add')
  addIngredient(@Body() addIngredientDto: AddIngredientDto) {
    return this.productsService.addIngredient(addIngredientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/image')
  @UseInterceptors(
    FileInterceptor('photo', {
      storage: diskStorage({
        destination: './uploads/',
        filename(
          req: any,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const parsedFile = parse(file.originalname);
          const fileName: string =
            parsedFile?.name.replace(/\s/g, '') + uuidv4();
          const extention: string = parsedFile?.ext;

          callback(null, `${fileName}${extention}`);
        },
      }),
    }),
  )
  uploadImg(
    @UploadedFile() file: Express.Multer.File,
    @Body() { productId }: { [key: string]: string },
  ) {
    return this.productsService.uploadImage(`/${file.filename}`, productId);
  }

  @Get()
  getAll(): Promise<Product[]> {
    return this.productsService.getAll();
  }
}
