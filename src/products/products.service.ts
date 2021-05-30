import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateChoiseDto } from './dto/create-choise.dto';
import { Choise, ChoiseDocument } from './shemas/choise.shemas';
import { Product, ProductDocument } from './shemas/product.shemas';
import { CreateCategoryDto } from './dto/create-category';
import { Category, CategoryDocument } from './shemas/category.shemas';
import { SearchDto } from './dto/search-product.dto';
import { Ingredient, IngredientDocument } from './shemas/ingredient.shemas';
import { IngredientDto } from './dto/create-ingredient.dto';
import { AddIngredientDto } from './dto/add-ingredient.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Choise.name) private choiseModel: Model<ChoiseDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
  ) {}

  async getAll(): Promise<Product[]> {
    return this.productModel.find().populate('choise').populate('category');
  }

  async getCategories(): Promise<Category[]> {
    try {
      const categories = await this.categoryModel.find();
      return categories;
    } catch (e) {
      console.log(e);
    }
  }

  async getById(id: string): Promise<Product> {
    return this.productModel.findById(id).populate('choise');
  }

  async create(productDto: CreateProductDto): Promise<Product> {
    try {
      const category = await this.categoryModel.findById(productDto.categoryId);
      if (!category) {
        throw new BadRequestException('pls provide existing category');
        return;
      }

      const newProduct = new this.productModel({
        ...productDto,
        categoryId: category._id,
      });

      await newProduct.save();
      category.products.push(newProduct);
      await category.save();

      return newProduct;
    } catch (e) {
      console.log(e);
      throw new BadRequestException('pls provide existing category');
    }
  }

  async searchProducts(searchBody: SearchDto): Promise<Product[]> {
    try {
      const products = await this.productModel.find({ ...searchBody }).exec();
      return products;
    } catch (e) {
      throw new BadRequestException('not valid filters');
    }
  }

  async remove(id: string): Promise<Product> {
    return this.productModel.findByIdAndRemove(id);
  }

  async update(id: string, productDto: any): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
  }

  async createChoise(choiseDto: CreateChoiseDto): Promise<Choise> {
    try {
      const newChoise = new this.choiseModel(choiseDto);
      await newChoise.save();
      const product = await this.productModel.findOne({
        id: newChoise.product,
      });
      product.choise.push(newChoise);
      await product.save();
      return newChoise;
    } catch (err) {
      console.log({ err });
    }
  }

  async deleteChoise(id: string): Promise<Choise> {
    return this.choiseModel.findByIdAndRemove(id);
  }

  async createCategory(categoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModel(categoryDto);
    return newCategory.save();
  }

  async createIngredient(ingredientDto: IngredientDto): Promise<Ingredient> {
    const ingredient = new this.ingredientModel(ingredientDto);
    await ingredient.save();
    return ingredient;
  }

  async getIngredients(): Promise<Ingredient[]> {
    const ingredients = await this.ingredientModel.find().exec();
    return ingredients;
  }

  async addIngredient(addIngredientDto: AddIngredientDto): Promise<Product> {
    try {
      const product = await this.productModel.findById(
        addIngredientDto.productId,
      );
      const ingredient = await this.ingredientModel.findById(
        addIngredientDto.ingredientId,
      );

      product.ingredients.push(ingredient);
      await product.save();

      return product;
    } catch (e) {}
  }
}
