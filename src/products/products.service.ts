import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { CreateChoiseDto } from "./dto/create-choise.dto";
import { Choise, ChoiseDocument } from "./shemas/choise.shemas";
import { Product, ProductDocument } from "./shemas/product.shemas";
import { CreateCategoryDto } from "./dto/create-category";
import { Category, CategoryDocument } from "./shemas/category.shemas";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>,
        @InjectModel(Choise.name) private choiseModel: Model<ChoiseDocument>,
        @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>
    ) {}

    async getAll(): Promise<Product[]> {
        return this.productModel.find().populate("choise")
    }

    async getById(id: string): Promise<Product> {
        return this.productModel.findById(id).populate("choise")
    }

    async create(productDto: CreateProductDto): Promise<Product> {
        const newProduct = new this.productModel(productDto)
        return newProduct.save()
    }

    async remove(id: string): Promise<Product> {
        return this.productModel.findByIdAndRemove(id)
    }

    async update(id: string, productDto: any): Promise<Product> {
        return this.productModel.findByIdAndUpdate(id, productDto, { new: true })
    }

    async createChoise(choiseDto: CreateChoiseDto): Promise<Choise> {
        try {
            const newChoise = new this.choiseModel(choiseDto)
            await newChoise.save()
            const product = await this.productModel.findOne({ id: newChoise.product })
            product.choise.push(newChoise);
            await product.save();
            return newChoise;
        } catch (err) {
            console.log({err})
        }
        
    }

    async deleteChoise(id: string): Promise<Choise> {
        return this.choiseModel.findByIdAndRemove(id)
    }

    async createCategory(categoryDto: CreateCategoryDto): Promise<Category> {
        const newCategory = new this.categoryModel(categoryDto)
        return newCategory.save()
    }
}