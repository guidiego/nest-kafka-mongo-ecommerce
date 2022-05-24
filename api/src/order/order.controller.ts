import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Order, OrderDocument } from './order.schema';
import { OrderService } from './order.service';

@Controller({ path: '/order' })
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    @Inject('ClientKafka') private readonly kafkaCli: ClientKafka,
  ) {}

  @Get()
  async getOrderList(): Promise<OrderDocument[]> {
    return await this.orderService.getOrders();
  }

  @Post()
  async createOrder(@Body() orderDto: Order): Promise<OrderDocument> {
    return await this.orderService.createOrder(orderDto);
  }

  @Get(':id')
  async getOrderDetail(@Param('id') orderId: string): Promise<OrderDocument> {
    return await this.orderService.getOrderById(orderId);
  }

  @Put(':id')
  async updateOrder(
    @Param('id') orderId: string,
    @Body() orderDto: Partial<Order>,
  ): Promise<OrderDocument> {
    const newOrder = await this.orderService.updateOrder(orderId, orderDto);

    await this.kafkaCli.emit('order-change-status', newOrder.toJSON());

    return newOrder;
  }
}
