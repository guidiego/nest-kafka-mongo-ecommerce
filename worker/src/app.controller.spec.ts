import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('./src/app.controller', () => {
  const fakeService = {
    getInvoiceByOrderId: jest.fn(),
    sendInvoice: jest.fn(),
  };
  const appController = new AppController(fakeService as unknown as AppService);

  describe('AppController', () => {
    it('should return null and not call anything when not "Shipped" state', async () => {
      const fakeMessage = { value: { status: 'foo' } };
      const response = await appController.onOrderChangeStatus(fakeMessage);

      expect(response).toBe('skipped');
      expect(fakeService.getInvoiceByOrderId).not.toHaveBeenCalled();
      expect(fakeService.sendInvoice).not.toHaveBeenCalled();
    });

    it('should return check invoice but not exec send whe not find it', async () => {
      fakeService.getInvoiceByOrderId.mockResolvedValue({});
      const fakeMessage = { value: { status: 'Shipped', _id: 'foo' } };
      const response = await appController.onOrderChangeStatus(fakeMessage);

      expect(response).toBe('skipped');
      expect(fakeService.getInvoiceByOrderId).toHaveBeenCalledWith(
        fakeMessage.value._id,
      );
      expect(fakeService.sendInvoice).not.toHaveBeenCalled();
    });

    it('should return perform correctly the sent', async () => {
      const fakeMessage = { value: { status: 'Shipped', _id: 'foo' } };
      fakeService.getInvoiceByOrderId.mockResolvedValue(fakeMessage.value);
      const response = await appController.onOrderChangeStatus(fakeMessage);

      expect(response).toBe('sent');
      expect(fakeService.getInvoiceByOrderId).toHaveBeenCalledWith(
        fakeMessage.value._id,
      );
      expect(fakeService.sendInvoice).toHaveBeenCalledWith(
        fakeMessage.value._id,
      );
    });
  });
});
