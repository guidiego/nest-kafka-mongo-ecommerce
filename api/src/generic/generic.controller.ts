import { Body, Get, Param, Post, Put } from '@nestjs/common';
import { GenericService } from './generic.service';

export class GenericController<Schema, Doc> {
  constructor(protected readonly service: GenericService<Schema, Doc>) {}

  @Get()
  async getList(): Promise<Doc[]> {
    return await this.service.getList();
  }

  @Post()
  async create(@Body() dto: Schema): Promise<Doc> {
    return await this.service.create(dto);
  }

  @Get(':id')
  async getDetail(@Param('id') id: string): Promise<Doc> {
    return await this.service.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: Partial<Schema>,
  ): Promise<Doc> {
    return await this.service.update(id, dto);
  }
}
