import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Category, CategoryShema } from './shemas/category.shemas';
import { Choise, ChoiseShema } from './shemas/choise.shemas';
import { Product, ProductShema } from './shemas/product.shemas';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductShema },
      { name: Choise.name, schema: ChoiseShema },
      { name: Category.name, schema: CategoryShema },
    ]),
  ],
})
export class ProductsModule {}
