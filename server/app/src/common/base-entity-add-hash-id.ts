// import crypto from 'crypto';
import { BaseEntity, BeforeInsert, Column, DataSource } from 'typeorm';
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
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const hashId = await gen();
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
}

async function gen(N = 20): Promise<string> {
  const { randomFillSync } = await import('node:crypto');
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from(randomFillSync(new Uint8Array(N)))
    .map((n) => S[n % S.length])
    .join('');
}
