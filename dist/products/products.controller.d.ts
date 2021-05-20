import { CreateCategoryDto } from './dto/create-category';
import { CreateChoiseDto } from './dto/create-choise.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';
import { Product } from './shemas/product.shemas';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    getAll(): Promise<Product[]>;
    getOne(params: any): Promise<Product>;
    updateProduct(params: any, CreateProductDto: CreateProductDto): Promise<Product>;
    create(CreateProductDto: CreateProductDto): Promise<Product>;
    createChoise(CreateChoiseDto: CreateChoiseDto): Promise<import("./shemas/choise.shemas").Choise>;
    createCategory(CreateCategoryDto: CreateCategoryDto): Promise<import("./shemas/category.shemas").Category>;
}
