import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { GetOrderPriceDto } from './dto/get-order-price.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @Get('/:id')
  getOrderById(@Query() id: string) {
    return this.orderService.getOrderById(id);
  }

  @Delete('/:id')
  deleteOrderById(@Query() id: string) {
    return this.orderService.deleteOrderById(id);
  }

  @Post('/price')
  deleteOrderPrice(@Body() getOrderPriceDto: GetOrderPriceDto) {
    return this.orderService.getOrderPrice(getOrderPriceDto);
  }

  @Get()
  getOrderList() {
    return this.orderService.getOrderList();
  }
}
