import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1670388247700 implements MigrationInterface {
  name = 'init1670388247700';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "consumer" ("id" BIGSERIAL NOT NULL, "hashId" character varying, "lineName" character varying, "image" character varying, "tel" character varying, "follow" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" bigint, CONSTRAINT "REL_f6a834cc95c095ee4ae1a85a01" UNIQUE ("userId"), CONSTRAINT "PK_85625b4d465d3aa0eb905127822" PRIMARY KEY ("id")); COMMENT ON COLUMN "consumer"."follow" IS 'ブロック判定'`,
    );
    await queryRunner.query(
      `CREATE TABLE "liff_config" ("id" BIGSERIAL NOT NULL, "hashId" character varying, "liffId" character varying NOT NULL, "name" character varying, "description" character varying, "type" character varying, "channelId" character varying, "channelSecret" character varying, "token" character varying, "tokenExpire" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "lineProviderId" bigint, CONSTRAINT "UQ_783c76908b396f281ed8a642d95" UNIQUE ("liffId"), CONSTRAINT "REL_082e0df3c86af2ba3e64b846e4" UNIQUE ("lineProviderId"), CONSTRAINT "PK_ea0c6d76ffe65fa75cb523da06f" PRIMARY KEY ("id")); COMMENT ON COLUMN "liff_config"."tokenExpire" IS 'tokenの利用期限'`,
    );
    await queryRunner.query(
      `CREATE TABLE "line_config" ("id" BIGSERIAL NOT NULL, "hashId" character varying, "name" character varying, "description" character varying, "status" character varying, "channelId" character varying, "channelSecret" character varying, "channelToken" character varying, "addFriendUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "lineProviderId" bigint, CONSTRAINT "REL_cf9314bedecaf6ab45ebb3db1e" UNIQUE ("lineProviderId"), CONSTRAINT "PK_f9756496c0693550c70b14070d3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "line_provider" ("id" BIGSERIAL NOT NULL, "hashId" character varying, "name" character varying, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "shopId" bigint, CONSTRAINT "REL_2e9b8b873522fd798f15211397" UNIQUE ("shopId"), CONSTRAINT "PK_bce4bd9e49bab9cf0d1769b3511" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "staff" ("id" BIGSERIAL NOT NULL, "hashId" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" bigint, "shopId" bigint, CONSTRAINT "REL_eba76c23bcfc9dad2479b7fd2a" UNIQUE ("userId"), CONSTRAINT "PK_e4ee98bb552756c180aec1e854a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "shop" ("id" BIGSERIAL NOT NULL, "hashId" character varying, "name" character varying, "email" character varying, "tel" character varying, "zipCode" character varying, "address" character varying, "address2" character varying, "description" character varying, "openedAt" TIMESTAMP, "closedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_ad47b7c6121fe31cb4b05438e44" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservation" ("id" BIGSERIAL NOT NULL, "hashId" character varying, "shippingDate" TIMESTAMP, "totalPrice" integer, "reservationDate" TIMESTAMP, "status" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "shopId" bigint, "userId" bigint, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id")); COMMENT ON COLUMN "reservation"."shippingDate" IS '出荷日時'; COMMENT ON COLUMN "reservation"."reservationDate" IS '予約日時'`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservation_products" ("reservationId" bigint NOT NULL, "productId" bigint NOT NULL, "quantity" integer NOT NULL, CONSTRAINT "PK_627e0ee8ddbd79dfeaa64c9ecb7" PRIMARY KEY ("reservationId", "productId")); COMMENT ON COLUMN "reservation_products"."quantity" IS '購入する商品数'`,
    );
    await queryRunner.query(
      `CREATE TABLE "producer" ("id" BIGSERIAL NOT NULL, "hashId" character varying, "email" character varying, "tel" character varying, "image" character varying, "description" character varying, "zipCode" character varying, "address" character varying, "address2" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" bigint, CONSTRAINT "REL_4288c6992857e1af9db1c6b6ea" UNIQUE ("userId"), CONSTRAINT "PK_4cfe496c2c70e4c9b9f444525a6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" BIGSERIAL NOT NULL, "hashId" character varying, "name" character varying, "description" character varying, "image" character varying, "saleStartDate" TIMESTAMP, "status" character varying, "price" integer, "unitWeight" integer, "totalAmount" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "producerId" bigint, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")); COMMENT ON COLUMN "product"."unitWeight" IS '商品単位の重量（g）'`,
    );
    await queryRunner.query(
      `CREATE TABLE "review" ("id" BIGSERIAL NOT NULL, "hashId" character varying, "content" character varying, "image" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" bigint, "productId" bigint, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "hashId" character varying, "name" character varying, "email" character varying, "tel" character varying, "zipCode" character varying, "address" character varying, "address2" character varying, "gender" character varying, "mainStatus" character varying, "birthday" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" BIGSERIAL NOT NULL, "hashId" character varying, "username" character varying, "email" character varying, "password" character varying, "role" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" bigint, CONSTRAINT "REL_60328bf27019ff5498c4b97742" UNIQUE ("userId"), CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "line_provider_consumers_consumer" ("lineProviderId" bigint NOT NULL, "consumerId" bigint NOT NULL, CONSTRAINT "PK_44951c17b60c0dcfd60f16fea48" PRIMARY KEY ("lineProviderId", "consumerId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_d54711172359f42a3ad147b58b" ON "line_provider_consumers_consumer" ("lineProviderId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_49d29e458355fe8071cc961d70" ON "line_provider_consumers_consumer" ("consumerId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "consumer" ADD CONSTRAINT "FK_f6a834cc95c095ee4ae1a85a01b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "liff_config" ADD CONSTRAINT "FK_082e0df3c86af2ba3e64b846e44" FOREIGN KEY ("lineProviderId") REFERENCES "line_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_config" ADD CONSTRAINT "FK_cf9314bedecaf6ab45ebb3db1ef" FOREIGN KEY ("lineProviderId") REFERENCES "line_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_provider" ADD CONSTRAINT "FK_2e9b8b873522fd798f152113971" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_eba76c23bcfc9dad2479b7fd2ad" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" ADD CONSTRAINT "FK_5b8f301b5a7bf25e58a7fc3836b" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_e5ee87fb994887a6f704b2176f0" FOREIGN KEY ("shopId") REFERENCES "shop"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_529dceb01ef681127fef04d755d" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_products" ADD CONSTRAINT "FK_1469d2b69aeae5bef7d60659e2e" FOREIGN KEY ("reservationId") REFERENCES "reservation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_products" ADD CONSTRAINT "FK_c7d34dbac9e25811d9c0c77199a" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" ADD CONSTRAINT "FK_4288c6992857e1af9db1c6b6eaf" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_aedbaa2962ffeb408fe497829dd" FOREIGN KEY ("producerId") REFERENCES "producer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_1337f93918c70837d3cea105d39" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" ADD CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" ADD CONSTRAINT "FK_60328bf27019ff5498c4b977421" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_provider_consumers_consumer" ADD CONSTRAINT "FK_d54711172359f42a3ad147b58b5" FOREIGN KEY ("lineProviderId") REFERENCES "line_provider"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_provider_consumers_consumer" ADD CONSTRAINT "FK_49d29e458355fe8071cc961d700" FOREIGN KEY ("consumerId") REFERENCES "consumer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "line_provider_consumers_consumer" DROP CONSTRAINT "FK_49d29e458355fe8071cc961d700"`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_provider_consumers_consumer" DROP CONSTRAINT "FK_d54711172359f42a3ad147b58b5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "account" DROP CONSTRAINT "FK_60328bf27019ff5498c4b977421"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_2a11d3c0ea1b2b5b1790f762b9a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "review" DROP CONSTRAINT "FK_1337f93918c70837d3cea105d39"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" DROP CONSTRAINT "FK_aedbaa2962ffeb408fe497829dd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "producer" DROP CONSTRAINT "FK_4288c6992857e1af9db1c6b6eaf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_products" DROP CONSTRAINT "FK_c7d34dbac9e25811d9c0c77199a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation_products" DROP CONSTRAINT "FK_1469d2b69aeae5bef7d60659e2e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_529dceb01ef681127fef04d755d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" DROP CONSTRAINT "FK_e5ee87fb994887a6f704b2176f0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_5b8f301b5a7bf25e58a7fc3836b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "staff" DROP CONSTRAINT "FK_eba76c23bcfc9dad2479b7fd2ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_provider" DROP CONSTRAINT "FK_2e9b8b873522fd798f152113971"`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_config" DROP CONSTRAINT "FK_cf9314bedecaf6ab45ebb3db1ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "liff_config" DROP CONSTRAINT "FK_082e0df3c86af2ba3e64b846e44"`,
    );
    await queryRunner.query(
      `ALTER TABLE "consumer" DROP CONSTRAINT "FK_f6a834cc95c095ee4ae1a85a01b"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_49d29e458355fe8071cc961d70"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_d54711172359f42a3ad147b58b"`,
    );
    await queryRunner.query(`DROP TABLE "line_provider_consumers_consumer"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "review"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "producer"`);
    await queryRunner.query(`DROP TABLE "reservation_products"`);
    await queryRunner.query(`DROP TABLE "reservation"`);
    await queryRunner.query(`DROP TABLE "shop"`);
    await queryRunner.query(`DROP TABLE "staff"`);
    await queryRunner.query(`DROP TABLE "line_provider"`);
    await queryRunner.query(`DROP TABLE "line_config"`);
    await queryRunner.query(`DROP TABLE "liff_config"`);
    await queryRunner.query(`DROP TABLE "consumer"`);
  }
}
