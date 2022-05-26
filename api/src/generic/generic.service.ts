import { Model } from 'mongoose';

export class GenericService<Schema, Doc> {
  constructor(protected model: Model<Doc>) {}

  async getList(): Promise<Doc[]> {
    return await this.model.find();
  }

  async create(dto: Schema): Promise<Doc> {
    return await this.model.create(dto);
  }

  async getById(id: string): Promise<Doc> {
    return await this.model.findById(id);
  }

  async update(id: string, dto: Partial<Schema>): Promise<Doc> {
    return await this.model.findByIdAndUpdate(id, dto, {
      returnOriginal: false,
    });
  }
}
