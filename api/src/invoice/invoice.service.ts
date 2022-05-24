import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Invoice, InvoiceDocument } from './invoice.schema';
import { Model } from 'mongoose';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
  ) {}

  async getInvoiceById(invoiceId: string): Promise<InvoiceDocument> {
    return await this.invoiceModel.findById(invoiceId);
  }

  async getInvoiceByOrderId(orderId: string): Promise<InvoiceDocument> {
    return await this.invoiceModel.findOne({ orderId });
  }

  async createInvoice(
    orderId: string,
    filePath: string,
  ): Promise<InvoiceDocument> {
    return await this.invoiceModel.create({ orderId, filePath });
  }

  async updateOrder(
    invoiceId: string,
    invoiceDto: Partial<Invoice>,
  ): Promise<InvoiceDocument> {
    return await this.invoiceModel.findByIdAndUpdate(invoiceId, invoiceDto, {
      returnOriginal: false,
    });
  }
}
