import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';

export class GenericService<Schema, Doc> {
  private readonly logger: Logger;

  constructor(protected model: Model<Doc>) {
    this.logger = new Logger(model.name + 'Service');
  }

  async getList(): Promise<Doc[]> {
    return await this.model.find();
  }

  async create(dto: Schema): Promise<Doc> {
    this.logger.verbose('Create called with dto:', dto);
    return await this.model.create(dto);
  }

  async getById(id: string): Promise<Doc> {
    this.logger.verbose('Detail called with id:', id);
    return await this.model.findById(id);
  }

  async update(id: string, dto: Partial<Schema>): Promise<Doc> {
    this.logger.verbose('Update called with (id, dto):', id, dto);
    return await this.model.findByIdAndUpdate(id, dto, {
      returnOriginal: false,
    });
  }
}
