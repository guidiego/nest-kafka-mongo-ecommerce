import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice, InvoiceDocument } from './invoice.schema';
import { Model } from 'mongoose';
import { GenericService } from '../generic/generic.service';

@Injectable()
export class InvoiceService extends GenericService<Invoice, InvoiceDocument> {
  constructor(
    @InjectModel(Invoice.name) protected model: Model<InvoiceDocument>,
  ) {
    super(model);
  }

  async getByOrderId(orderId: string): Promise<InvoiceDocument> {
    return await this.model.findOne({ orderId });
  }
}
