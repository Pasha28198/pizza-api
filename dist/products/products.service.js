"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const choise_shemas_1 = require("./shemas/choise.shemas");
const product_shemas_1 = require("./shemas/product.shemas");
const category_shemas_1 = require("./shemas/category.shemas");
let ProductsService = class ProductsService {
    constructor(productModel, choiseModel, categoryModel) {
        this.productModel = productModel;
        this.choiseModel = choiseModel;
        this.categoryModel = categoryModel;
    }
    async getAll() {
        return this.productModel.find().populate("choise").populate("category");
    }
    async getById(id) {
        return this.productModel.findById(id).populate("choise");
    }
    async create(productDto) {
        const newProduct = new this.productModel(productDto);
        return newProduct.save();
    }
    async remove(id) {
        return this.productModel.findByIdAndRemove(id);
    }
    async update(id, productDto) {
        return this.productModel.findByIdAndUpdate(id, productDto, { new: true });
    }
    async createChoise(choiseDto) {
        try {
            const newChoise = new this.choiseModel(choiseDto);
            await newChoise.save();
            const product = await this.productModel.findOne({ id: newChoise.product });
            product.choise.push(newChoise);
            await product.save();
            return newChoise;
        }
        catch (err) {
            console.log({ err });
        }
    }
    async deleteChoise(id) {
        return this.choiseModel.findByIdAndRemove(id);
    }
    async createCategory(categoryDto) {
        const newCategory = new this.categoryModel(categoryDto);
        return newCategory.save();
    }
};
ProductsService = __decorate([
    common_1.Injectable(),
    __param(0, mongoose_1.InjectModel(product_shemas_1.Product.name)),
    __param(1, mongoose_1.InjectModel(choise_shemas_1.Choise.name)),
    __param(2, mongoose_1.InjectModel(category_shemas_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map