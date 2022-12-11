import { MigrationInterface, QueryRunner } from 'typeorm';

export class EditHashIdColumn1670690325287 implements MigrationInterface {
  name = 'EditHashIdColumn1670690325287';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "consumer" ALTER COLUMN "hashId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "consumer" ADD CONSTRAINT "UQ_4d51a2db2c4344857be0c47ff4a" UNIQUE ("hashId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "liff_config" ALTER COLUMN "hashId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "liff_config" ADD CONSTRAINT "UQ_7f445153cfb838662206e2151e1" UNIQUE ("hashId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_config" ALTER COLUMN "hashId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_config" ADD CONSTRAINT "UQ_eb72a3c95ae51b879ac3ea8c541" UNIQUE ("hashId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_provider" ALTER COLUMN "hashId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_provider" ADD CONSTRAINT "UQ_5bd175cab1a29fbc7cfdbf7d7ab" UNIQUE ("hashId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "hashId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "UQ_82b51c32d75603d778944b348b3" UNIQUE ("hashId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ALTER COLUMN "hashId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ADD CONSTRAINT "UQ_4615c62d18d67f0a69cdefe6dd9" UNIQUE ("hashId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ALTER COLUMN "hashId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "UQ_9caeba8af385725b199a1e4c9e0" UNIQUE ("hashId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" ALTER COLUMN "hashId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" ADD CONSTRAINT "UQ_c1e4a9c4944c6a850bdcd32e7cb" UNIQUE ("hashId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "hashId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "UQ_83330a3807cc920b5976d7a93d4" UNIQUE ("hashId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ALTER COLUMN "hashId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "UQ_580c45d09666915b77a0a06473c" UNIQUE ("hashId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "hashId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_62078b8e0f95ad9006f9af4d9dc" UNIQUE ("hashId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "hashId" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "UQ_8376b793d099c1b25697c1dd0cd" UNIQUE ("hashId")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "UQ_8376b793d099c1b25697c1dd0cd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ALTER COLUMN "hashId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_62078b8e0f95ad9006f9af4d9dc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "hashId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "UQ_580c45d09666915b77a0a06473c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ALTER COLUMN "hashId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "UQ_83330a3807cc920b5976d7a93d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ALTER COLUMN "hashId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" DROP CONSTRAINT "UQ_c1e4a9c4944c6a850bdcd32e7cb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" ALTER COLUMN "hashId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "UQ_9caeba8af385725b199a1e4c9e0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ALTER COLUMN "hashId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" DROP CONSTRAINT "UQ_4615c62d18d67f0a69cdefe6dd9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "shop" ALTER COLUMN "hashId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "UQ_82b51c32d75603d778944b348b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ALTER COLUMN "hashId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_provider" DROP CONSTRAINT "UQ_5bd175cab1a29fbc7cfdbf7d7ab"`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_provider" ALTER COLUMN "hashId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_config" DROP CONSTRAINT "UQ_eb72a3c95ae51b879ac3ea8c541"`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_config" ALTER COLUMN "hashId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "liff_config" DROP CONSTRAINT "UQ_7f445153cfb838662206e2151e1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "liff_config" ALTER COLUMN "hashId" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "consumer" DROP CONSTRAINT "UQ_4d51a2db2c4344857be0c47ff4a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consumer" ALTER COLUMN "hashId" DROP NOT NULL`,
    );
  }
}
