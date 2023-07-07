import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1686869965014 implements MigrationInterface {
  name = 'migrations1686869965014';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "line_config" ("hashId" character varying NOT NULL, "id" BIGSERIAL NOT NULL, "name" character varying, "description" character varying, "status" character varying, "channelId" character varying, "channelSecret" character varying, "channelToken" character varying, "addFriendUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "lineProviderId" bigint, CONSTRAINT "UQ_eb72a3c95ae51b879ac3ea8c541" UNIQUE ("hashId"), CONSTRAINT "REL_cf9314bedecaf6ab45ebb3db1e" UNIQUE ("lineProviderId"), CONSTRAINT "PK_f9756496c0693550c70b14070d3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "line_provider" ("hashId" character varying NOT NULL, "id" BIGSERIAL NOT NULL, "name" character varying, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_5bd175cab1a29fbc7cfdbf7d7ab" UNIQUE ("hashId"), CONSTRAINT "PK_bce4bd9e49bab9cf0d1769b3511" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "liff_config" ("hashId" character varying NOT NULL, "id" BIGSERIAL NOT NULL, "liffId" character varying NOT NULL, "name" character varying, "description" character varying, "type" character varying, "channelId" character varying, "channelSecret" character varying, "token" character varying, "tokenExpire" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "lineProviderId" bigint, CONSTRAINT "UQ_7f445153cfb838662206e2151e1" UNIQUE ("hashId"), CONSTRAINT "UQ_783c76908b396f281ed8a642d95" UNIQUE ("liffId"), CONSTRAINT "REL_082e0df3c86af2ba3e64b846e4" UNIQUE ("lineProviderId"), CONSTRAINT "PK_ea0c6d76ffe65fa75cb523da06f" PRIMARY KEY ("id")); COMMENT ON COLUMN "liff_config"."tokenExpire" IS 'tokenの利用期限'`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "consumer_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "total_price" integer NOT NULL DEFAULT '0', "desired_at" TIMESTAMP WITH TIME ZONE NOT NULL, "receive_location_id" uuid NOT NULL, "status" character varying(10) NOT NULL, "shipper_id" uuid, "packed_at" TIMESTAMP WITH TIME ZONE, "shipped_at" TIMESTAMP WITH TIME ZONE, "kept_at" TIMESTAMP WITH TIME ZONE, "received_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id")); COMMENT ON COLUMN "reservation"."id" IS 'ユーザーID'; COMMENT ON COLUMN "reservation"."consumer_id" IS '消費者ID'; COMMENT ON COLUMN "reservation"."product_id" IS '出品ID'; COMMENT ON COLUMN "reservation"."quantity" IS '予約数量'; COMMENT ON COLUMN "reservation"."total_price" IS '総額'; COMMENT ON COLUMN "reservation"."desired_at" IS '受取希望日時'; COMMENT ON COLUMN "reservation"."receive_location_id" IS '受取場所ID'; COMMENT ON COLUMN "reservation"."status" IS 'ステータス'; COMMENT ON COLUMN "reservation"."shipper_id" IS '配送者ID'; COMMENT ON COLUMN "reservation"."packed_at" IS '出荷日時'; COMMENT ON COLUMN "reservation"."shipped_at" IS '配送日時'; COMMENT ON COLUMN "reservation"."kept_at" IS '店舗預かり日時'; COMMENT ON COLUMN "reservation"."received_at" IS '受取日時'; COMMENT ON COLUMN "reservation"."created_at" IS '作成日時'; COMMENT ON COLUMN "reservation"."updated_at" IS '更新日時'; COMMENT ON COLUMN "reservation"."deleted_at" IS '削除日時'`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "producer_id" uuid NOT NULL, "name" character varying(30) NOT NULL, "kinds" character varying(10) NOT NULL, "description" text NOT NULL DEFAULT '', "start_at" TIMESTAMP WITH TIME ZONE NOT NULL, "end_at" TIMESTAMP WITH TIME ZONE NOT NULL, "unit" character varying(10) NOT NULL, "unit_quantity" integer NOT NULL DEFAULT '1', "unit_price" integer NOT NULL DEFAULT '1', "image" text, "quantity" integer NOT NULL DEFAULT '1', "remaining" integer NOT NULL DEFAULT '1', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")); COMMENT ON COLUMN "product"."id" IS '出品ID'; COMMENT ON COLUMN "product"."producer_id" IS '生産者ID'; COMMENT ON COLUMN "product"."name" IS '作物名'; COMMENT ON COLUMN "product"."kinds" IS '作物の種類'; COMMENT ON COLUMN "product"."description" IS '説明'; COMMENT ON COLUMN "product"."start_at" IS '予約開始'; COMMENT ON COLUMN "product"."end_at" IS '予約終了'; COMMENT ON COLUMN "product"."unit" IS '単位'; COMMENT ON COLUMN "product"."unit_quantity" IS '単価数量'; COMMENT ON COLUMN "product"."unit_price" IS '単価'; COMMENT ON COLUMN "product"."image" IS '画像'; COMMENT ON COLUMN "product"."quantity" IS '予約数量'; COMMENT ON COLUMN "product"."remaining" IS '残数量'; COMMENT ON COLUMN "product"."created_at" IS '作成日時'; COMMENT ON COLUMN "product"."updated_at" IS '更新日時'; COMMENT ON COLUMN "product"."deleted_at" IS '削除日時'`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "password" character varying(72) NOT NULL, "classification" character varying(10) NOT NULL, "attribute" character varying(20) NOT NULL, "name" character varying(30) NOT NULL, "tel" character varying(14) NOT NULL, "zip_code" character varying(8) NOT NULL, "address" character varying(100) NOT NULL, "remarks" text NOT NULL DEFAULT '', "image" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")); COMMENT ON COLUMN "account"."id" IS 'ユーザーID'; COMMENT ON COLUMN "account"."email" IS 'メールアドレス'; COMMENT ON COLUMN "account"."password" IS 'パスワード'; COMMENT ON COLUMN "account"."classification" IS '区分'; COMMENT ON COLUMN "account"."attribute" IS '属性'; COMMENT ON COLUMN "account"."name" IS '名前'; COMMENT ON COLUMN "account"."tel" IS '電話番号'; COMMENT ON COLUMN "account"."zip_code" IS '郵便番号'; COMMENT ON COLUMN "account"."address" IS '住所'; COMMENT ON COLUMN "account"."remarks" IS '自己紹介'; COMMENT ON COLUMN "account"."image" IS 'ユーザー画像'; COMMENT ON COLUMN "account"."created_at" IS '作成日時'; COMMENT ON COLUMN "account"."updated_at" IS '更新日時'; COMMENT ON COLUMN "account"."deleted_at" IS '削除日時'`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_config" ADD CONSTRAINT "FK_cf9314bedecaf6ab45ebb3db1ef" FOREIGN KEY ("lineProviderId") REFERENCES "line_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "liff_config" ADD CONSTRAINT "FK_082e0df3c86af2ba3e64b846e44" FOREIGN KEY ("lineProviderId") REFERENCES "line_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_05479378153afa1bea219866f96" FOREIGN KEY ("consumer_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_8d50e21bc2ac13e92bddb624513" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_2a4f99f2e0071cb0907e5808692" FOREIGN KEY ("receive_location_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reservation" ADD CONSTRAINT "FK_853c7fb75ea5f225c0ed93d26f1" FOREIGN KEY ("shipper_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD CONSTRAINT "FK_d478a408853788d463d987149eb" FOREIGN KEY ("producer_id") REFERENCES "account"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_d478a408853788d463d987149eb"`);
    await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_853c7fb75ea5f225c0ed93d26f1"`);
    await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_2a4f99f2e0071cb0907e5808692"`);
    await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_8d50e21bc2ac13e92bddb624513"`);
    await queryRunner.query(`ALTER TABLE "reservation" DROP CONSTRAINT "FK_05479378153afa1bea219866f96"`);
    await queryRunner.query(`ALTER TABLE "liff_config" DROP CONSTRAINT "FK_082e0df3c86af2ba3e64b846e44"`);
    await queryRunner.query(`ALTER TABLE "line_config" DROP CONSTRAINT "FK_cf9314bedecaf6ab45ebb3db1ef"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "reservation"`);
    await queryRunner.query(`DROP TABLE "liff_config"`);
    await queryRunner.query(`DROP TABLE "line_provider"`);
    await queryRunner.query(`DROP TABLE "line_config"`);
  }
}
