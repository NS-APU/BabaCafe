import { NotFoundException } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { BaseEntity, DataSource } from 'typeorm';

export class GetKeyValidationPipe {
  constructor(@InjectDataSource() private dataSource: DataSource) {}

  async target<T extends BaseEntity>({
    entity,
    value,
    key = 'hashId',
    withDeleted = false,
  }: {
    entity: T;
    value: string | number;
    key?: string;
    withDeleted?: boolean;
  }) {
    const repo = this.dataSource.getRepository(entity.constructor.name);

    const row = (await repo?.findOne({
      where: { [key]: value },
      withDeleted,
    })) as T;

    if (!row) {
      throw new NotFoundException(
        `${entity.constructor.name} with ${key}: "${value}" is not found`,
      );
    }

    return row;
  }
}
