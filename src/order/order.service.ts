import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument, Order } from './shema/order.shemas';
import { Ingredient, IngredientDocument } from '../products/shemas/ingredient.shemas';
import { GetOrderPriceDto } from './dto/get-order-price.dto';
import { Product, ProductDocument } from '../products/shemas/product.shemas';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
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

  async getOrderPrice(getOrderPriceDto: GetOrderPriceDto): Promise<number> {
    // getOrderPriceDto.products.reduce((prev, current) => ({
    //
    // }), 0)

    return 2000;
  }

  async getOrderById(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id);

    return order;
  }

  async deleteOrderById(id: string): Promise<Order> {
    const order = await this.orderModel.findByIdAndRemove(id);

    return order;
  }

  // async formatProductToNormalFormat(products) {
  //   return Promise.all(products.map((item: any) => ({
  //
  //   })))
  // }
}
