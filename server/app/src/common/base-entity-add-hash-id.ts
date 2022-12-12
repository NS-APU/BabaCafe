import { BaseEntity, BeforeInsert, Column, DataSource } from 'typeorm';
import crypto from 'crypto';
import { InjectDataSource } from '@nestjs/typeorm';

export class BaseEntityAddHashId extends BaseEntity {
  constructor(@InjectDataSource() private dataSource?: DataSource) {
    super();
  }

  @Column({ unique: true })
  hashId: string;

  @BeforeInsert()
  async function() {
    await this.generateHashId();
  }

  async generateHashId() {
    if (this.hashId) return;
    const repo = this.dataSource?.getRepository(this.constructor.name);
    const hashId = gen();
    const row = await repo?.findOne({
      where: { hashId },
      withDeleted: true,
    });
    if (!row) {
      this.hashId = hashId;
      return;
    }
  }
}

function gen(N = 20): string {
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from(crypto.randomFillSync(new Uint8Array(N)))
    .map((n) => S[n % S.length])
    .join('');
}
