import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnNameToProducer1670949021808
  implements MigrationInterface
{
  name = 'AddColumnNameToProducer1670949021808';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "producer" ADD "name" character varying`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "producer"."name" IS '農業法人名'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `COMMENT ON COLUMN "producer"."name" IS '農業法人名'`,
    );
    await queryRunner.query(`ALTER TABLE "producer" DROP COLUMN "name"`);
  }
}
