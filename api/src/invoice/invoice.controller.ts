import {
  Controller,
  Param,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InvoiceDocument } from './invoice.schema';
import { InvoiceService } from './invoice.service';

@Controller({ path: '/invoice' })
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get('order/:orderId')
  async getInvoiceDetailByOrder(
    @Param('orderId') orderId: string,
  ): Promise<InvoiceDocument> {
    return await this.invoiceService.getInvoiceByOrderId(orderId);
  }

  @Post('order/:orderId')
  @UseInterceptors(FileInterceptor('invoiceFile'))
  async createInvoice(
    @Param('orderId') orderId: string,
    @UploadedFile() invoiceFile: Express.Multer.File,
  ): Promise<InvoiceDocument> {
    console.log(invoiceFile);
    return await this.invoiceService.createInvoice(
      orderId,
      invoiceFile.path + '.pdf',
    );
  }

  @Get(':invoiceId')
  async getInvoiceDetail(
    @Param('invoiceId') invoiceId: string,
  ): Promise<InvoiceDocument> {
    return await this.invoiceService.getInvoiceById(invoiceId);
  }

  @Put(':invoiceId/send')
  async sendInvoice(@Param('invoiceId') invoiceId: string) {
    return await this.invoiceService.updateOrder(invoiceId, {
      sendAt: new Date(),
    });
  }

}
