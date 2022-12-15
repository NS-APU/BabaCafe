import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnIdToReservationProducts1671071063137
  implements MigrationInterface
{
  name = 'AddColumnIdToReservationProducts1671071063137';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation_products" ADD "hashId" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_products" ADD CONSTRAINT "UQ_251ebb543c33df908609189ded6" UNIQUE ("hashId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_products" ADD "id" BIGSERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_products" DROP CONSTRAINT "PK_627e0ee8ddbd79dfeaa64c9ecb7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_products" ADD CONSTRAINT "PK_08c579b39d3b9955097ad25dcc1" PRIMARY KEY ("reservationId", "productId", "id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "reservation_products" DROP CONSTRAINT "PK_08c579b39d3b9955097ad25dcc1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_products" ADD CONSTRAINT "PK_627e0ee8ddbd79dfeaa64c9ecb7" PRIMARY KEY ("reservationId", "productId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_products" DROP COLUMN "id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_products" DROP CONSTRAINT "UQ_251ebb543c33df908609189ded6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_products" DROP COLUMN "hashId"`,
    );
  }
}
