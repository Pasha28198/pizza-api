import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument, Order } from './shema/order.shemas';
import {
  Ingredient,
  IngredientDocument,
} from '../products/shemas/ingredient.shemas';
import { GetOrderPriceDto } from './dto/get-order-price.dto';
import { Product, ProductDocument } from '../products/shemas/product.shemas';
import { Choise, ChoiseDocument } from '../products/shemas/choise.shemas';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Choise.name) private choiseModel: Model<ChoiseDocument>,
    @InjectModel(Ingredient.name)
    private ingredientModel: Model<IngredientDocument>,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const order = new this.orderModel(createOrderDto);

    await order.save();

    return order;
  }

  async getOrderList(): Promise<Order[]> {
    const orders = await this.orderModel.find();

    return orders;
  }

  async getOrderPrice(
    getOrderPriceDto: GetOrderPriceDto,
  ): Promise<{ price: number }> {
    let price = 0;
    for await (const product of getOrderPriceDto.products) {
      const choise = await this.choiseModel.findById(product.choise);
      if (!choise) continue;

      if (!product.ingredients.length) {
        price = price + choise.price * product.quantity;
      } else {
        price =
          price +
          (await this.combinePriceWithIngredient(choise, product.ingredients));
      }
    }

    return { price };
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id);

    return order;
  }

  async deleteOrderById(id: string): Promise<Order> {
    const order = await this.orderModel.findByIdAndRemove(id);

    return order;
  }

  async combinePriceWithIngredient(
    choise: Choise,
    ingredients: Array<string>,
  ): Promise<number> {
    console.log(choise);
    try {
      // const {
      //   ingredients: defaultIngredient,
      // } = await this.productModel
      //   .findById(choise.productId)
      //   .populate('ingredients');
      const extraIngredients = await this.ingredientModel.find({
        _id: { $in: ingredients },
      });

      return 0;
    } catch (e) {
      console.log(e);
    }
  }
}
