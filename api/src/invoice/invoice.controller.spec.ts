import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './invoice.service';

describe('src/invoice/controller', () => {
  const invoiceService = {
    getByOrderId: jest.fn(),
    create: jest.fn(),
  };

  const invoiceController = new InvoiceController(
    invoiceService as unknown as InvoiceService,
  );

  describe('InvoiceController', () => {
    it('should return the correct value from createInvoice', async () => {
      const fakeResp = 'bla';
      const fakeOrderId = '1';
      const fakeFile = { path: 'foo' } as Express.Multer.File;

      invoiceService.create.mockResolvedValue(fakeResp);
      const response = await invoiceController.createInvoice(
        fakeOrderId,
        fakeFile,
      );

      expect(invoiceService.create).toHaveBeenCalledWith({
        orderId: fakeOrderId,
        filePath: fakeFile.path + '.pdf',
      });
      expect(invoiceService.create).toHaveBeenCalledTimes(1);
      expect(response).toBe(fakeResp);
    });

    it('should return the correct value from getInvoiceDetailByOrder', async () => {
      const fakeResp = 'bla';
      const fakeOrderId = '1';
      invoiceService.getByOrderId.mockResolvedValue(fakeResp);
      const response = await invoiceController.getInvoiceDetailByOrder(
        fakeOrderId,
      );

      expect(invoiceService.getByOrderId).toHaveBeenCalledWith(fakeOrderId);
      expect(invoiceService.getByOrderId).toHaveBeenCalledTimes(1);
      expect(response).toBe(fakeResp);
    });
  });
});
