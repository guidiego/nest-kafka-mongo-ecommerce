import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderModule } from './order/order.module';
import { InvoiceModule } from './invoice/invoice.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL),
    OrderModule,
    InvoiceModule,
  ],
})
export class AppModule {}
