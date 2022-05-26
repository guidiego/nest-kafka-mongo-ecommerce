import { ClientKafka } from '@nestjs/microservices';
import { OrderController } from './order.controller';
import { Order } from './order.schema';
import { OrderService } from './order.service';

describe('src/order/controller', () => {
  const orderService = {
    update: jest.fn(),
  };

  const kafkaCli = {
    emit: jest.fn(),
  };

  const orderController = new OrderController(
    orderService as unknown as OrderService,
    kafkaCli as unknown as ClientKafka,
  );

  describe('OrderController', () => {
    it('should return the correct value from update', async () => {
      const fakeOrderId = '1';
      const fakeOrder = { foo: 'bar' } as unknown as Order;
      const fakeDoc = { ...fakeOrder, toJSON: jest.fn() };

      fakeDoc.toJSON.mockReturnValue(fakeOrder);
      orderService.update.mockResolvedValue(fakeDoc);
      const response = await orderController.update(fakeOrderId, fakeOrder);

      expect(orderService.update).toHaveBeenCalledTimes(1);
      expect(orderService.update).toHaveBeenCalledWith(fakeOrderId, fakeOrder);
      expect(kafkaCli.emit).toHaveBeenCalledTimes(1);
      expect(kafkaCli.emit).toHaveBeenCalledWith(
        'order-change-status',
        fakeOrder,
      );
      expect(response).toBe(fakeDoc);
    });
  });
});
