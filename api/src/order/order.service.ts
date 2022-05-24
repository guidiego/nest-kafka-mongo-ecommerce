import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
  ) {}

  async getOrders(): Promise<OrderDocument[]> {
    return await this.orderModel.find();
  }

  async createOrder(orderDto: Order): Promise<OrderDocument> {
    return await this.orderModel.create(orderDto);
  }

  async getOrderById(orderId: string): Promise<OrderDocument> {
    return await this.orderModel.findById(orderId);
  }

  async updateOrder(
    orderId: string,
    orderDto: Partial<Order>,
  ): Promise<OrderDocument> {
    return await this.orderModel.findByIdAndUpdate(orderId, orderDto, {
      returnOriginal: false,
    });
  }
}
