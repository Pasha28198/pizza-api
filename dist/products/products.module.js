"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const products_controller_1 = require("./products.controller");
const products_service_1 = require("./products.service");
const category_shemas_1 = require("./shemas/category.shemas");
const choise_shemas_1 = require("./shemas/choise.shemas");
const product_shemas_1 = require("./shemas/product.shemas");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    common_1.Module({
        providers: [products_service_1.ProductsService],
        controllers: [products_controller_1.ProductsController],
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: product_shemas_1.Product.name, schema: product_shemas_1.ProductShema },
                { name: choise_shemas_1.Choise.name, schema: choise_shemas_1.ChoiseShema },
                { name: category_shemas_1.Category.name, schema: category_shemas_1.CategoryShema }
            ])
        ]
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map