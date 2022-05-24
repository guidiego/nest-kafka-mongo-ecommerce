import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('order-change-status')
  async getHello(@Payload() message) {
    if (message.value.status !== 'Shipped') {
      return;
    }

    const invoice = await this.appService.getInvoiceByOrderId(
      message.value._id,
    );

    if (invoice._id) {
      await this.appService.sendInvoice(invoice._id);
    }
  }
}
