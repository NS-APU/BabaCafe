import { MigrationInterface, QueryRunner } from 'typeorm';

export class migrations1690167570415 implements MigrationInterface {
  name = 'migrations1690167570415';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "liff_config" ("hashId" character varying NOT NULL, "id" BIGSERIAL NOT NULL, "liffId" character varying NOT NULL, "name" character varying, "description" character varying, "type" character varying, "channelId" character varying, "channelSecret" character varying, "token" character varying, "tokenExpire" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "lineProviderId" bigint, CONSTRAINT "UQ_7f445153cfb838662206e2151e1" UNIQUE ("hashId"), CONSTRAINT "UQ_783c76908b396f281ed8a642d95" UNIQUE ("liffId"), CONSTRAINT "REL_082e0df3c86af2ba3e64b846e4" UNIQUE ("lineProviderId"), CONSTRAINT "PK_ea0c6d76ffe65fa75cb523da06f" PRIMARY KEY ("id")); COMMENT ON COLUMN "liff_config"."tokenExpire" IS 'tokenの利用期限'`,
    );
    await queryRunner.query(
      `CREATE TABLE "line_provider" ("hashId" character varying NOT NULL, "id" BIGSERIAL NOT NULL, "name" character varying, "description" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_5bd175cab1a29fbc7cfdbf7d7ab" UNIQUE ("hashId"), CONSTRAINT "PK_bce4bd9e49bab9cf0d1769b3511" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "line_config" ("hashId" character varying NOT NULL, "id" BIGSERIAL NOT NULL, "name" character varying, "description" character varying, "status" character varying, "channelId" character varying, "channelSecret" character varying, "channelToken" character varying, "addFriendUrl" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "lineProviderId" bigint, CONSTRAINT "UQ_eb72a3c95ae51b879ac3ea8c541" UNIQUE ("hashId"), CONSTRAINT "REL_cf9314bedecaf6ab45ebb3db1e" UNIQUE ("lineProviderId"), CONSTRAINT "PK_f9756496c0693550c70b14070d3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "logistics_setting_for_intermediary" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "intermediary_id" uuid NOT NULL, "bus_stop" character varying(50) NOT NULL, CONSTRAINT "REL_bfc8e61b842fe421aa8473f2dd" UNIQUE ("intermediary_id"), CONSTRAINT "PK_2cf537324358402df29a50087cd" PRIMARY KEY ("id")); COMMENT ON COLUMN "logistics_setting_for_intermediary"."id" IS 'ID'; COMMENT ON COLUMN "logistics_setting_for_intermediary"."intermediary_id" IS '引渡し業者ID'; COMMENT ON COLUMN "logistics_setting_for_intermediary"."bus_stop" IS '最寄りのバス停'`,
    );
    await queryRunner.query(
      `CREATE TABLE "timetable" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "flight_id" uuid NOT NULL, "bus_stop" character varying(50) NOT NULL, "time" TIMESTAMP NOT NULL, CONSTRAINT "PK_06001d91b3fe346fb1387ad1a15" PRIMARY KEY ("id")); COMMENT ON COLUMN "timetable"."id" IS 'ID'; COMMENT ON COLUMN "timetable"."flight_id" IS '便ID'; COMMENT ON COLUMN "timetable"."bus_stop" IS 'バス停'; COMMENT ON COLUMN "timetable"."time" IS '時刻'`,
    );
    await queryRunner.query(
      `CREATE TABLE "flight" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "route_id" uuid NOT NULL, "name" character varying(50) NOT NULL, "shock_level" integer NOT NULL, "capacity" integer NOT NULL, CONSTRAINT "PK_bf571ce6731cf071fc51b94df03" PRIMARY KEY ("id")); COMMENT ON COLUMN "flight"."id" IS 'ID'; COMMENT ON COLUMN "flight"."route_id" IS '路線ID'; COMMENT ON COLUMN "flight"."name" IS '便名称'; COMMENT ON COLUMN "flight"."shock_level" IS '衝撃度合い'; COMMENT ON COLUMN "flight"."capacity" IS '最大取扱量'`,
    );
    await queryRunner.query(
      `CREATE TABLE "route" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "logistics_setting_id" uuid NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_08affcd076e46415e5821acf52d" PRIMARY KEY ("id")); COMMENT ON COLUMN "route"."id" IS 'ID'; COMMENT ON COLUMN "route"."logistics_setting_id" IS '物流業者向け物流設定ID'; COMMENT ON COLUMN "route"."name" IS '路線名称'`,
    );
    await queryRunner.query(
      `CREATE TABLE "logistics_setting_for_logistics" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "logistics_id" uuid NOT NULL, "delivery_type" character varying(10) NOT NULL, CONSTRAINT "REL_127e868a2b9548f6a2862f3a86" UNIQUE ("logistics_id"), CONSTRAINT "PK_22843b3bf87ebc6a2706ee1397e" PRIMARY KEY ("id")); COMMENT ON COLUMN "logistics_setting_for_logistics"."id" IS 'ID'; COMMENT ON COLUMN "logistics_setting_for_logistics"."logistics_id" IS '物流業者ID'; COMMENT ON COLUMN "logistics_setting_for_logistics"."delivery_type" IS '集荷・配送方法'`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_consolidation_define" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "producer_id" uuid NOT NULL, "name" character varying(50) NOT NULL, "shock_level" integer NOT NULL, CONSTRAINT "PK_98d6cc2c4258cb961d0f429121c" PRIMARY KEY ("id")); COMMENT ON COLUMN "user_consolidation_define"."id" IS 'ID'; COMMENT ON COLUMN "user_consolidation_define"."producer_id" IS '生産者ID'; COMMENT ON COLUMN "user_consolidation_define"."name" IS '名称'; COMMENT ON COLUMN "user_consolidation_define"."shock_level" IS '衝撃度合い'`,
    );
    await queryRunner.query(
      `CREATE TABLE "logistics_setting_for_producer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "producer_id" uuid NOT NULL, "bus_stop" character varying(50) NOT NULL, CONSTRAINT "REL_ea4946d052ea2ea9870faae3a5" UNIQUE ("producer_id"), CONSTRAINT "PK_033b326cac0c588c5ae6b53dd1f" PRIMARY KEY ("id")); COMMENT ON COLUMN "logistics_setting_for_producer"."id" IS 'ID'; COMMENT ON COLUMN "logistics_setting_for_producer"."producer_id" IS '生産者ID'; COMMENT ON COLUMN "logistics_setting_for_producer"."bus_stop" IS '最寄りのバス停'`,
    );
    await queryRunner.query(
      `CREATE TABLE "shipping_schedule" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "logistics_id" uuid NOT NULL, "logistics_name" character varying(30) NOT NULL, "route_id" uuid NOT NULL, "route_name" character varying(50) NOT NULL, "flight_id" uuid NOT NULL, "flight_name" character varying(50) NOT NULL, "pickup_bus_stop" character varying(50) NOT NULL, "pickup_time" TIMESTAMP NOT NULL, "delivery_bus_stop" character varying(50) NOT NULL, "delivery_time" TIMESTAMP NOT NULL, "reservations" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_a14f1a2c6029aaed09f889c56ea" PRIMARY KEY ("id")); COMMENT ON COLUMN "shipping_schedule"."id" IS 'ID'; COMMENT ON COLUMN "shipping_schedule"."logistics_id" IS '物流業者ID'; COMMENT ON COLUMN "shipping_schedule"."logistics_name" IS '物流業者名'; COMMENT ON COLUMN "shipping_schedule"."route_id" IS '路線ID'; COMMENT ON COLUMN "shipping_schedule"."route_name" IS '路線名'; COMMENT ON COLUMN "shipping_schedule"."flight_id" IS '便ID'; COMMENT ON COLUMN "shipping_schedule"."flight_name" IS '便名'; COMMENT ON COLUMN "shipping_schedule"."pickup_bus_stop" IS '集荷先バス停'; COMMENT ON COLUMN "shipping_schedule"."pickup_time" IS '集荷予定時刻'; COMMENT ON COLUMN "shipping_schedule"."delivery_bus_stop" IS '配送先バス停'; COMMENT ON COLUMN "shipping_schedule"."delivery_time" IS '配送予定時刻'; COMMENT ON COLUMN "shipping_schedule"."reservations" IS '出荷予約ID一覧'; COMMENT ON COLUMN "shipping_schedule"."created_at" IS '作成日時'`,
    );
    await queryRunner.query(
      `CREATE TABLE "reservation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "consumer_id" uuid NOT NULL, "product_id" uuid NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "total_price" integer NOT NULL DEFAULT '0', "desired_at" TIMESTAMP WITH TIME ZONE NOT NULL, "receive_location_id" uuid NOT NULL, "status" character varying(10) NOT NULL, "shipper_id" uuid, "shipping_schedule_id" uuid, "packed_at" TIMESTAMP WITH TIME ZONE, "shipped_at" TIMESTAMP WITH TIME ZONE, "kept_at" TIMESTAMP WITH TIME ZONE, "received_at" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_48b1f9922368359ab88e8bfa525" PRIMARY KEY ("id")); COMMENT ON COLUMN "reservation"."id" IS 'ユーザーID'; COMMENT ON COLUMN "reservation"."consumer_id" IS '消費者ID'; COMMENT ON COLUMN "reservation"."product_id" IS '出品ID'; COMMENT ON COLUMN "reservation"."quantity" IS '予約数量'; COMMENT ON COLUMN "reservation"."total_price" IS '総額'; COMMENT ON COLUMN "reservation"."desired_at" IS '受取希望日時'; COMMENT ON COLUMN "reservation"."receive_location_id" IS '受取場所ID'; COMMENT ON COLUMN "reservation"."status" IS 'ステータス'; COMMENT ON COLUMN "reservation"."shipper_id" IS '配送者ID'; COMMENT ON COLUMN "reservation"."shipping_schedule_id" IS '出荷スケジュールID'; COMMENT ON COLUMN "reservation"."packed_at" IS '出荷日時'; COMMENT ON COLUMN "reservation"."shipped_at" IS '配送日時'; COMMENT ON COLUMN "reservation"."kept_at" IS '店舗預かり日時'; COMMENT ON COLUMN "reservation"."received_at" IS '受取日時'; COMMENT ON COLUMN "reservation"."created_at" IS '作成日時'; COMMENT ON COLUMN "reservation"."updated_at" IS '更新日時'; COMMENT ON COLUMN "reservation"."deleted_at" IS '削除日時'`,
    );
    await queryRunner.query(
      `CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "producer_id" uuid NOT NULL, "name" character varying(30) NOT NULL, "kinds" character varying(10) NOT NULL, "description" text NOT NULL DEFAULT '', "start_at" TIMESTAMP WITH TIME ZONE NOT NULL, "end_at" TIMESTAMP WITH TIME ZONE NOT NULL, "unit" character varying(10) NOT NULL, "unit_quantity" integer NOT NULL DEFAULT '1', "unit_price" integer NOT NULL DEFAULT '1', "image" text, "quantity" integer NOT NULL DEFAULT '1', "remaining" integer NOT NULL DEFAULT '1', "shock_level" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id")); COMMENT ON COLUMN "product"."id" IS '出品ID'; COMMENT ON COLUMN "product"."producer_id" IS '生産者ID'; COMMENT ON COLUMN "product"."name" IS '作物名'; COMMENT ON COLUMN "product"."kinds" IS '作物の種類'; COMMENT ON COLUMN "product"."description" IS '説明'; COMMENT ON COLUMN "product"."start_at" IS '予約開始'; COMMENT ON COLUMN "product"."end_at" IS '予約終了'; COMMENT ON COLUMN "product"."unit" IS '単位'; COMMENT ON COLUMN "product"."unit_quantity" IS '単価数量'; COMMENT ON COLUMN "product"."unit_price" IS '単価'; COMMENT ON COLUMN "product"."image" IS '画像'; COMMENT ON COLUMN "product"."quantity" IS '予約数量'; COMMENT ON COLUMN "product"."remaining" IS '残数量'; COMMENT ON COLUMN "product"."shock_level" IS '衝撃度合い'; COMMENT ON COLUMN "product"."created_at" IS '作成日時'; COMMENT ON COLUMN "product"."updated_at" IS '更新日時'; COMMENT ON COLUMN "product"."deleted_at" IS '削除日時'`,
    );
    await queryRunner.query(
      `CREATE TABLE "account" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(50) NOT NULL, "password" character varying(72) NOT NULL, "classification" character varying(10) NOT NULL, "attribute" character varying(20) NOT NULL, "name" character varying(30) NOT NULL, "tel" character varying(14) NOT NULL, "zip_code" character varying(8) NOT NULL, "address" character varying(100) NOT NULL, "remarks" text NOT NULL DEFAULT '', "image" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_54115ee388cdb6d86bb4bf5b2ea" PRIMARY KEY ("id")); COMMENT ON COLUMN "account"."id" IS 'ユーザーID'; COMMENT ON COLUMN "account"."email" IS 'メールアドレス'; COMMENT ON COLUMN "account"."password" IS 'パスワード'; COMMENT ON COLUMN "account"."classification" IS '区分'; COMMENT ON COLUMN "account"."attribute" IS '属性'; COMMENT ON COLUMN "account"."name" IS '名前'; COMMENT ON COLUMN "account"."tel" IS '電話番号'; COMMENT ON COLUMN "account"."zip_code" IS '郵便番号'; COMMENT ON COLUMN "account"."address" IS '住所'; COMMENT ON COLUMN "account"."remarks" IS '自己紹介'; COMMENT ON COLUMN "account"."image" IS 'ユーザー画像'; COMMENT ON COLUMN "account"."created_at" IS '作成日時'; COMMENT ON COLUMN "account"."updated_at" IS '更新日時'; COMMENT ON COLUMN "account"."deleted_at" IS '削除日時'`,
    );
    await queryRunner.query(
      `CREATE TABLE "system_consolidation_define" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "shock_level" integer NOT NULL, CONSTRAINT "PK_4a57a4014ea4d57cf0c552349c4" PRIMARY KEY ("id")); COMMENT ON COLUMN "system_consolidation_define"."id" IS 'ID'; COMMENT ON COLUMN "system_consolidation_define"."name" IS '名称'; COMMENT ON COLUMN "system_consolidation_define"."shock_level" IS '衝撃度合い'`,
    );
    await queryRunner.query(
      `ALTER TABLE "liff_config" ADD CONSTRAINT "FK_082e0df3c86af2ba3e64b846e44" FOREIGN KEY ("lineProviderId") REFERENCES "line_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "line_config" ADD CONSTRAINT "FK_cf9314bedecaf6ab45ebb3db1ef" FOREIGN KEY ("lineProviderId") REFERENCES "line_provider"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "logistics_setting_for_intermediary" ADD CONSTRAINT "FK_bfc8e61b842fe421aa8473f2dd8" FOREIGN KEY ("intermediary_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "timetable" ADD CONSTRAINT "FK_33540db1b837dccab0e8bc60a7d" FOREIGN KEY ("flight_id") REFERENCES "flight"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "flight" ADD CONSTRAINT "FK_bb2165c7bc925577d85a7003a5e" FOREIGN KEY ("route_id") REFERENCES "route"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "route" ADD CONSTRAINT "FK_092209caa42cfd9064bcae8f8cd" FOREIGN KEY ("logistics_setting_id") REFERENCES "logistics_setting_for_logistics"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "logistics_setting_for_logistics" ADD CONSTRAINT "FK_127e868a2b9548f6a2862f3a860" FOREIGN KEY ("logistics_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_consolidation_define" ADD CONSTRAINT "FK_aa5aa093d18acd795fdd9c32451" FOREIGN KEY ("producer_id") REFERENCES "logistics_setting_for_producer"("producer_id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "logistics_setting_for_producer" ADD CONSTRAINT "FK_ea4946d052ea2ea9870faae3a5b" FOREIGN KEY ("producer_id") REFERENCES "account"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
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
    await queryRunner.query(
      `ALTER TABLE "logistics_setting_for_producer" DROP CONSTRAINT "FK_ea4946d052ea2ea9870faae3a5b"`,
    );
    await queryRunner.query(`ALTER TABLE "user_consolidation_define" DROP CONSTRAINT "FK_aa5aa093d18acd795fdd9c32451"`);
    await queryRunner.query(
      `ALTER TABLE "logistics_setting_for_logistics" DROP CONSTRAINT "FK_127e868a2b9548f6a2862f3a860"`,
    );
    await queryRunner.query(`ALTER TABLE "route" DROP CONSTRAINT "FK_092209caa42cfd9064bcae8f8cd"`);
    await queryRunner.query(`ALTER TABLE "flight" DROP CONSTRAINT "FK_bb2165c7bc925577d85a7003a5e"`);
    await queryRunner.query(`ALTER TABLE "timetable" DROP CONSTRAINT "FK_33540db1b837dccab0e8bc60a7d"`);
    await queryRunner.query(
      `ALTER TABLE "logistics_setting_for_intermediary" DROP CONSTRAINT "FK_bfc8e61b842fe421aa8473f2dd8"`,
    );
    await queryRunner.query(`ALTER TABLE "line_config" DROP CONSTRAINT "FK_cf9314bedecaf6ab45ebb3db1ef"`);
    await queryRunner.query(`ALTER TABLE "liff_config" DROP CONSTRAINT "FK_082e0df3c86af2ba3e64b846e44"`);
    await queryRunner.query(`DROP TABLE "system_consolidation_define"`);
    await queryRunner.query(`DROP TABLE "account"`);
    await queryRunner.query(`DROP TABLE "product"`);
    await queryRunner.query(`DROP TABLE "reservation"`);
    await queryRunner.query(`DROP TABLE "shipping_schedule"`);
    await queryRunner.query(`DROP TABLE "logistics_setting_for_producer"`);
    await queryRunner.query(`DROP TABLE "user_consolidation_define"`);
    await queryRunner.query(`DROP TABLE "logistics_setting_for_logistics"`);
    await queryRunner.query(`DROP TABLE "route"`);
    await queryRunner.query(`DROP TABLE "flight"`);
    await queryRunner.query(`DROP TABLE "timetable"`);
    await queryRunner.query(`DROP TABLE "logistics_setting_for_intermediary"`);
    await queryRunner.query(`DROP TABLE "line_config"`);
    await queryRunner.query(`DROP TABLE "line_provider"`);
    await queryRunner.query(`DROP TABLE "liff_config"`);
  }
}
