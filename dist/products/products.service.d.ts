import { Model } from "mongoose";
import { CreateProductDto } from "./dto/create-product.dto";
import { CreateChoiseDto } from "./dto/create-choise.dto";
import { Choise, ChoiseDocument } from "./shemas/choise.shemas";
import { Product, ProductDocument } from "./shemas/product.shemas";
import { CreateCategoryDto } from "./dto/create-category";
import { Category, CategoryDocument } from "./shemas/category.shemas";
export declare class ProductsService {
    private productModel;
    private choiseModel;
    private categoryModel;
    constructor(productModel: Model<ProductDocument>, choiseModel: Model<ChoiseDocument>, categoryModel: Model<CategoryDocument>);
    getAll(): Promise<Product[]>;
    getById(id: string): Promise<Product>;
    create(productDto: CreateProductDto): Promise<Product>;
    remove(id: string): Promise<Product>;
    update(id: string, productDto: any): Promise<Product>;
    createChoise(choiseDto: CreateChoiseDto): Promise<Choise>;
    deleteChoise(id: string): Promise<Choise>;
    createCategory(categoryDto: CreateCategoryDto): Promise<Category>;
}
