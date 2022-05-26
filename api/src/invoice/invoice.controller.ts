import {
  Controller,
  Param,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GenericController } from '../generic/generic.controller';
import { Invoice, InvoiceDocument } from './invoice.schema';
import { InvoiceService } from './invoice.service';

@Controller({ path: '/invoice' })
export class InvoiceController extends GenericController<
  Invoice,
  InvoiceDocument
> {
  constructor(protected readonly service: InvoiceService) {
    super(service);
  }

  @Get('order/:orderId')
  async getInvoiceDetailByOrder(
    @Param('orderId') orderId: string,
  ): Promise<InvoiceDocument> {
    return await this.service.getByOrderId(orderId);
  }

  @Post('order/:orderId')
  @UseInterceptors(FileInterceptor('invoiceFile'))
  async createInvoice(
    @Param('orderId') orderId: string,
    @UploadedFile() invoiceFile: Express.Multer.File,
  ): Promise<InvoiceDocument> {
    return await this.service.create({
      orderId,
      filePath: invoiceFile.path + '.pdf',
    });
  }
}
