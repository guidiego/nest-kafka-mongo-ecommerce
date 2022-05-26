import { Model } from 'mongoose';
import { GenericService } from './generic.service';

type Doc = {
  foo: string;
};

describe('src/generic/service', () => {
  const fakeModel = {
    find: jest.fn(),
    create: jest.fn(),
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
  };

  const genericService = new GenericService<Doc, Doc>(
    fakeModel as unknown as Model<Doc>,
  );

  describe('GenericService', () => {
    it('should return the correct value from getList', async () => {
      const fakeResp = ['bla'];
      fakeModel.find.mockResolvedValue(fakeResp);
      const response = await genericService.getList();

      expect(fakeModel.find).toHaveBeenCalledTimes(1);
      expect(fakeModel.find).toHaveBeenCalledWith();
      expect(response).toBe(fakeResp);
    });

    it('should return the correct value from getById', async () => {
      const fakeResp = ['bla'];
      const fakeId = '1';
      fakeModel.findById.mockResolvedValue(fakeResp);
      const response = await genericService.getById(fakeId);

      expect(fakeModel.findById).toHaveBeenCalledTimes(1);
      expect(fakeModel.findById).toHaveBeenCalledWith(fakeId);
      expect(response).toBe(fakeResp);
    });

    it('should return the correct value from create', async () => {
      const fakeResp = ['bla'];
      const fakeDto: Doc = { foo: 'bar' };
      fakeModel.create.mockResolvedValue(fakeResp);
      const response = await genericService.create(fakeDto);

      expect(fakeModel.create).toHaveBeenCalledTimes(1);
      expect(fakeModel.create).toHaveBeenCalledWith(fakeDto);
      expect(response).toBe(fakeResp);
    });

    it('should return the correct value from update', async () => {
      const fakeResp = ['bla'];
      const fakeId = '1';
      const fakeDto: Doc = { foo: 'bar' };
      fakeModel.findByIdAndUpdate.mockResolvedValue(fakeResp);
      const response = await genericService.update(fakeId, fakeDto);

      expect(fakeModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
      expect(fakeModel.findByIdAndUpdate).toHaveBeenCalledWith(
        fakeId,
        fakeDto,
        { returnOriginal: false },
      );
      expect(response).toBe(fakeResp);
    });
  });
});
