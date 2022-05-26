import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

@Schema()
export class Invoice {
  @Prop({
    required: true,
    unique: true,
  })
  orderId: string;

  @Prop({ required: true })
  filePath: string;

  @Prop()
  sendAt?: Date;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);
