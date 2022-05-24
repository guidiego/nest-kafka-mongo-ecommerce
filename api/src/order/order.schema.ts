import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;
export enum OrderStatus {
  Created = 'Created',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
  ShippingInProgress = 'ShippingInProgress',
  Shipped = 'Shipped',
}

@Schema()
export class Order {
  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  productId: number;

  @Prop({ required: true })
  customerId: number;

  @Prop({ required: true })
  sellerId: number;

  @Prop({ required: true, default: OrderStatus.Created })
  status: OrderStatus;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
