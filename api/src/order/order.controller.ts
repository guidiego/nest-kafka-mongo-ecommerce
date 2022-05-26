import { Body, Controller, Inject, Param, Put } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { GenericController } from '../generic/generic.controller';
import { Order, OrderDocument } from './order.schema';

@Controller({ path: '/order' })
export class OrderController extends GenericController<Order, OrderDocument> {
  constructor(
    protected readonly service: OrderService,
    @Inject('ClientKafka') private readonly kafkaCli: ClientKafka,
  ) {
    super(service);
  }

  @Put(':id')
  async update(
    @Param('id') orderId: string,
    @Body() orderDto: Partial<Order>,
  ): Promise<OrderDocument> {
    const newOrder = await super.update(orderId, orderDto);

    await this.kafkaCli.emit('order-change-status', newOrder.toJSON());

    return newOrder;
  }
}
