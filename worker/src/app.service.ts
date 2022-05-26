import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private baseUrl: string = process.env.API_URL;

  constructor(private httpService: HttpService) {}

  getInvoiceByOrderId(orderId): Promise<any> {
    return new Promise((resolve) => {
      this.httpService
        .get(`${this.baseUrl}/invoice/order/${orderId}`)
        .subscribe((response) => {
          resolve(response.data);
        });
    });
  }

  sendInvoice(invoiceId: string): Promise<any> {
    return new Promise((resolve) => {
      this.httpService
        .put(`${this.baseUrl}/invoice/${invoiceId}`, { sentAt: new Date() })
        .subscribe((response) => {
          resolve(response.data);
        });
    });
  }
}
