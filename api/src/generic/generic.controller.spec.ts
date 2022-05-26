import { GenericController } from './generic.controller';
import { GenericService } from './generic.service';

type Doc = {
  foo: string;
};

describe('src/generic/controller', () => {
  const genericService = {
    getList: jest.fn(),
    create: jest.fn(),
    getById: jest.fn(),
    update: jest.fn(),
  };

  const genericController = new GenericController<Doc, Doc>(
    genericService as unknown as GenericService<Doc, Doc>,
  );

  describe('GenericController', () => {
    it('should return the correct value from getList', async () => {
      const fakeResp = ['bla'];
      genericService.getList.mockResolvedValue(fakeResp);
      const response = await genericController.getList();

      expect(response).toBe(fakeResp);
    });

    it('should return the correct value from getDetail', async () => {
      const fakeResp = 'bla';
      const fakeId = '1';
      genericService.getById.mockResolvedValue(fakeResp);
      const response = await genericController.getDetail(fakeId);

      expect(genericService.getById).toHaveBeenCalledWith(fakeId);
      expect(genericService.getById).toHaveBeenCalledTimes(1);
      expect(response).toBe(fakeResp);
    });

    it('should return the correct value from create', async () => {
      const fakeResp = 'bla';
      const fakeDto: Doc = { foo: 'bar' };
      genericService.create.mockResolvedValue(fakeResp);
      const response = await genericController.create(fakeDto);

      expect(genericService.create).toHaveBeenCalledWith(fakeDto);
      expect(genericService.create).toHaveBeenCalledTimes(1);
      expect(response).toBe(fakeResp);
    });

    it('should return the correct value from update', async () => {
      const fakeResp = 'bla';
      const fakeId = '1';
      const fakeDto: Doc = { foo: 'bar' };
      genericService.update.mockResolvedValue(fakeResp);
      const response = await genericController.update(fakeId, fakeDto);

      expect(genericService.update).toHaveBeenCalledWith(fakeId, fakeDto);
      expect(genericService.update).toHaveBeenCalledTimes(1);
      expect(response).toBe(fakeResp);
    });
  });
});
