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
import { DeleteIngredientDto } from './dto/delete-ingridient';
import { DeleteChoiseDto } from './dto/delete-choise.dto';

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
    return this.productModel
      .find()
      .populate('choise')
      .populate({
        path: 'ingredients',
        populate: {
          path: 'ingredient',
          model: 'Ingredient',
        },
      })
      .exec();
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
    return this.productModel
      .findById(id)
      .populate('choise')
      .populate({
        path: 'ingredients',
        populate: {
          path: 'ingredient',
          model: 'Ingredient',
        },
      });
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
      const products = await this.productModel
        .find({ ...searchBody })
        .populate('choise')
        .populate({
          path: 'ingredients',
          populate: {
            path: 'ingredient',
            model: 'Ingredient',
          },
        })
        .exec();
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

  async createChoise(choiseDto: CreateChoiseDto): Promise<Product> {
    try {
      const newChoise = new this.choiseModel(choiseDto);
      await newChoise.save();

      const product = await this.productModel.findById(choiseDto.productId);

      product.choise.push(newChoise);
      await product.save();
      return product;
    } catch (err) {
      console.log({ err });
    }
  }

  async deleteChoise(deleteChoiseDto: DeleteChoiseDto): Promise<Choise> {
    try {
      const choise = await this.choiseModel.findByIdAndRemove(
        deleteChoiseDto.id,
      );

      console.log(choise);

      const product = await this.productModel.findById(choise.productId);

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      product.choise.pull({ _id: deleteChoiseDto.id });

      return choise;
    } catch (e) {
      console.log(e);
    }
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

  async deleteIngredientById(id: string): Promise<Ingredient> {
    try {
      const ingredient = await this.ingredientModel.findByIdAndRemove(id);
      return ingredient;
    } catch (e) {}
  }

  async deleteProduct(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findByIdAndRemove(id);
      return product;
    } catch (e) {}
  }

  async addIngredient(addIngredientDto: AddIngredientDto): Promise<Product> {
    try {
      const product = await this.productModel.findById(
        addIngredientDto.productId,
      );
      const ingredient = await this.ingredientModel.findById(
        addIngredientDto.ingredientId,
      );

      product.ingredients.push({
        ingredient: ingredient,
        count: addIngredientDto.count,
      });

      await product.save();

      return product;
    } catch (e) {
      console.log(e);
    }
  }

  async uploadImage(pathFile: string, productId: string): Promise<Product> {
    const product = await this.productModel
      .findByIdAndUpdate(productId, {
        img: pathFile,
      })
      .populate('choise')
      .populate({
        path: 'ingredients',
        populate: {
          path: 'ingredient',
          model: 'Ingredient',
        },
      })
      .exec();

    return product;
  }

  async deleteIngredient(
    deleteIngredient: DeleteIngredientDto,
  ): Promise<Product> {
    try {
      console.log(deleteIngredient.productId);
      const product = await this.productModel
        .findById(deleteIngredient.productId)
        .populate({
          path: 'ingredients',
          populate: {
            path: 'ingredient',
            model: 'Ingredient',
          },
        });

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      product.ingredients.pull({
        ingredient: { _id: deleteIngredient.ingredientId },
      });

      await product.save();

      console.log(product);

      return product;
    } catch (e) {
      console.log(e);
    }
  }
}
