import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderShema } from './shema/order.shemas';
import { Product, ProductShema } from '../products/shemas/product.shemas';
import { Ingredient, IngredientShema } from '../products/shemas/ingredient.shemas';
import { Choise, ChoiseShema } from '../products/shemas/choise.shemas';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductShema },
      { name: Ingredient.name, schema: IngredientShema },
      { name: Order.name, schema: OrderShema },
      { name: Choise.name, schema: ChoiseShema },
    ]),
  ],
})
export class OrderModule {}
