import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  getInvoiceByOrderId(orderId): Promise<any> {
    return new Promise((resolve) => {
      this.httpService
        .get(`http://0.0.0.0:3000/invoice/order/${orderId}`)
        .subscribe((response) => {
          resolve(response.data);
        });
    });
  }

  sendInvoice(invoiceId: string): Promise<any> {
    return new Promise((resolve) => {
      this.httpService
        .put(`http://0.0.0.0:3000/invoice/${invoiceId}/send`)
        .subscribe((response) => {
          resolve(response.data);
        });
    });
  }
}
