import { Model } from 'mongoose';
import { InvoiceDocument } from './invoice.schema';
import { InvoiceService } from './invoice.service';

describe('src/invoice/service', () => {
  const fakeModel = {
    create: jest.fn(),
    findOne: jest.fn(),
  };

  const invoiceService = new InvoiceService(
    fakeModel as unknown as Model<InvoiceDocument>,
  );

  describe('InvoiceServicel', () => {
    it('should return the correct value from getByOrderId', async () => {
      const fakeResp = ['bla'];
      const fakeOrderId = '1';
      fakeModel.findOne.mockResolvedValue(fakeResp);
      const response = await invoiceService.getByOrderId(fakeOrderId);

      expect(fakeModel.findOne).toHaveBeenCalledTimes(1);
      expect(fakeModel.findOne).toHaveBeenCalledWith({ orderId: fakeOrderId });
      expect(response).toBe(fakeResp);
    });
  });
});
