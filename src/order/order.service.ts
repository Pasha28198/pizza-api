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
    const { price } = await this.getOrderPrice({
      products: createOrderDto.products,
    });

    const order = new this.orderModel({
      ...createOrderDto,
      price,
    });
    await order.save();

    return order;
  }

  async getOrderList(): Promise<Order[]> {
    const orders = await this.orderModel
      .find()
      .populate({
        path: 'products',
        populate: {
          path: 'ingredients',
          model: 'Ingredient',
        },
      })
      .populate('choise')
      .populate({
        path: 'products',
        populate: {
          path: 'choise',
          model: 'Choise',
        },
      });

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
        price = (price + choise.price) * product.quantity;
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
    try {
      const countIngredients = doCountFormat(ingredients);
      const extraIngredients = doPriceFormat(
        await this.ingredientModel.find({
          _id: { $in: ingredients },
        }),
      );

      return (
        Number(choise.price) +
        Object.keys(extraIngredients).reduce(
          (prev, curr) =>
            prev +
            Number(extraIngredients[curr]) * Number(countIngredients[curr]),
          0,
        )
      );
    } catch (e) {
      console.log(e);
    }
  }
}

function doPriceFormat(ingredients: any & { _id: string }) {
  return ingredients.reduce(
    (prev, current) => ({ ...prev, [current._id]: current.price }),
    {},
  );
}

function doCountFormat(ingredients: any & { _id: string }) {
  return ingredients.reduce(
    (prev, current) => ({ ...prev, [current._id]: current.count }),
    {},
  );
}
