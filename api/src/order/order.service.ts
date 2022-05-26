import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './order.schema';
import { Model } from 'mongoose';
import { GenericService } from '../generic/generic.service';

@Injectable()
export class OrderService extends GenericService<Order, OrderDocument> {
  constructor(@InjectModel(Order.name) protected model: Model<OrderDocument>) {
    super(model);
  }
}
