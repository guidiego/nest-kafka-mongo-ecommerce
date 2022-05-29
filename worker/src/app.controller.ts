import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('order-change-status')
  async onOrderChangeStatus(@Payload() message) {
    // @TODO: Remove Magic String for Shipped
    if (message.value.status !== 'Shipped') {
      return 'skipped';
    }

    const invoice = await this.appService.getInvoiceByOrderId(
      message.value._id,
    );

    if (!invoice._id) {
      return 'skipped';
    }

    await this.appService.sendInvoice(invoice._id);
    return 'sent';
  }
}
