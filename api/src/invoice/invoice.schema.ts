import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MSchema } from 'mongoose';
import { Order } from '../order/order.schema';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice {
  @Prop({
    required: true,
    type: MSchema.Types.ObjectId,
    ref: 'Order',
    unique: true,
  })
  orderId: Order;

  @Prop({ required: true })
  filePath: string;

  @Prop()
  sendAt: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
