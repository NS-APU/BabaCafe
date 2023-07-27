import * as bcrypt from 'bcrypt';
import { MigrationInterface, QueryRunner } from 'typeorm';

const DEFAULT_PASSWORD = 'test';

export class InsertMasterDataInDB1690362384516 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // システム混載定義
    await queryRunner.query(
      `INSERT INTO system_consolidation_define (id, name, shock_level) VALUES ('d7842174-a712-4606-9e77-4ed76569266f', '弁当', 45)`,
    );
    await queryRunner.query(
      `INSERT INTO system_consolidation_define (id, name, shock_level) VALUES ('c5da3a3e-8d6b-48df-b697-7e234f1f9a78', '惣菜', 45)`,
    );
    await queryRunner.query(
      `INSERT INTO system_consolidation_define (id, name, shock_level) VALUES ('428097b2-690c-4f90-8fcc-be50d131c76f', '米', 60)`,
    );
    await queryRunner.query(
      `INSERT INTO system_consolidation_define (id, name, shock_level) VALUES ('856f1efb-7aa4-4128-88f5-1a8e2584a483', '山菜', 45)`,
    );

    // TODO: 現状は物流業者向け物流設定を行うUIがないためマスターデータとして作成する（UI対応後に削除予定）
    // アカウント
    await queryRunner.query(
      `INSERT INTO account (id, email, password, classification, attribute, name, tel, zip_code, address, remarks, image, created_at, updated_at) VALUES ('0083fc30-15fc-4ad5-916d-2e367ffd5bc2', 'logistics@example.com', '${await this.hashedPassword()}', 'corporate', 'logistics', '下岩川地区ふれあいバス', '000-0000-0000', '000-0000', '秋田県山本郡三種町下岩川長面台50', '', '', '2023-07-27 00:00:00.000000+09', '2023-07-27 00:00:00.000000+09')`,
    );
    // 物流業者向け物流設定
    await queryRunner.query(
      `INSERT INTO logistics_setting_for_logistics (id, logistics_id, delivery_type) VALUES ('42bcbcbb-62c9-4ac8-9e8d-5afdabdd2517', '0083fc30-15fc-4ad5-916d-2e367ffd5bc2', 'route')`,
    );
    // 路線
    await queryRunner.query(
      `INSERT INTO route (id, logistics_setting_id, name) VALUES ('4d44a591-5924-4239-a46c-23d8134f9ff4', '42bcbcbb-62c9-4ac8-9e8d-5afdabdd2517', '下岩川ふれあいバス（養助号）上り')`,
    );
    await queryRunner.query(
      `INSERT INTO route (id, logistics_setting_id, name) VALUES ('2e9c5a4a-0519-4d47-b259-d5a5f4a76728', '42bcbcbb-62c9-4ac8-9e8d-5afdabdd2517', '下岩川ふれあいバス（養助号）下り')`,
    );
    // 便（上り）
    await queryRunner.query(
      `INSERT INTO trip (id, route_id, name, shock_level, capacity) VALUES ('9e860e2b-0ffc-464d-84b7-b66926253aa4', '4d44a591-5924-4239-a46c-23d8134f9ff4', '1便', 60, 10)`,
    );
    await queryRunner.query(
      `INSERT INTO trip (id, route_id, name, shock_level, capacity) VALUES ('4d44a591-5924-4239-a46c-23d8134f9ff2', '4d44a591-5924-4239-a46c-23d8134f9ff4', '2便', 45, 10)`,
    );
    await queryRunner.query(
      `INSERT INTO trip (id, route_id, name, shock_level, capacity) VALUES ('1466f21f-72d2-4c84-b394-da366b82e07a', '4d44a591-5924-4239-a46c-23d8134f9ff4', '3便', 60, 10)`,
    );
    await queryRunner.query(
      `INSERT INTO trip (id, route_id, name, shock_level, capacity) VALUES ('71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '4d44a591-5924-4239-a46c-23d8134f9ff4', '4便', 45, 10)`,
    );
    await queryRunner.query(
      `INSERT INTO trip (id, route_id, name, shock_level, capacity) VALUES ('5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '4d44a591-5924-4239-a46c-23d8134f9ff4', '5便', 60, 10)`,
    );
    // 便（下り）
    await queryRunner.query(
      `INSERT INTO trip (id, route_id, name, shock_level, capacity) VALUES ('f5303601-e7bb-4277-af09-8a9750c30b11', '2e9c5a4a-0519-4d47-b259-d5a5f4a76728', '1便', 60, 10)`,
    );
    await queryRunner.query(
      `INSERT INTO trip (id, route_id, name, shock_level, capacity) VALUES ('5a041d1c-52b9-4c3b-aaa4-125478729c39', '2e9c5a4a-0519-4d47-b259-d5a5f4a76728', '2便', 45, 10)`,
    );
    await queryRunner.query(
      `INSERT INTO trip (id, route_id, name, shock_level, capacity) VALUES ('116435fa-5adf-46a7-a00b-36b2bd7a7aff', '2e9c5a4a-0519-4d47-b259-d5a5f4a76728', '3便', 60, 10)`,
    );
    await queryRunner.query(
      `INSERT INTO trip (id, route_id, name, shock_level, capacity) VALUES ('612ce9a2-810d-48b5-b54a-b87b75612c9e', '2e9c5a4a-0519-4d47-b259-d5a5f4a76728', '4便', 45, 10)`,
    );
    await queryRunner.query(
      `INSERT INTO trip (id, route_id, name, shock_level, capacity) VALUES ('b3ba9859-9886-4b39-b676-e401d6cc7e58', '2e9c5a4a-0519-4d47-b259-d5a5f4a76728', '5便', 60, 10)`,
    );
    // 時刻表（上り 1便）
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('93ff4b0e-9fe2-4537-a9d2-5e2ec9ff2613', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '蛭沢 近藤三男宅前', '2023-07-27 06:20:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('44f24909-fb39-4585-aa41-b2439966674f', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '外ノ沢 消防小屋前', '2023-07-27 06:23:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('30a96703-09e4-4a3e-a24a-0a781f061014', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '小町 バス停', '2023-07-27 06:26:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('fff55dc4-e455-4129-92e4-aa6570d01d7b', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '中野 バス停', '2023-07-27 06:27:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('4cc8f60c-ed97-4588-8b71-9d7561b71653', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '宮ノ目 バス停', '2023-07-27 06:28:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('4ac372f5-1d73-480c-b0c4-7b161056768f', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '上長面 近藤鉄義宅前', '2023-07-27 06:29:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('9924dd30-5dfb-4300-a5de-989b9f54c80b', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '赤川商店前 バス停', '2023-07-27 06:30:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('c94d8dc6-7782-4d41-89aa-55b900f86220', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '北貞商店前 バス停', '2023-07-27 06:31:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('6d5c67fc-f3bc-49bf-848e-45364cd352d3', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '不動田 バス停', '2023-07-27 06:32:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('429d98ad-3693-4ecf-8b68-2a6a011308ca', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '谷地ノ沢入口 バス停', '2023-07-27 06:33:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('a1a6a958-3947-4908-883c-e3fae87268cf', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '達子 バス停', '2023-07-27 06:34:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('34c17fa5-72fa-44e3-b264-b4c09e22bdd7', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '向達子 バス停', '2023-07-27 06:35:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('5a0bc35e-5676-4182-8dcd-a7ca007a068c', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '増沢 バス停', '2023-07-27 06:38:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('b951c275-c532-4963-b84b-9d5d5ba99451', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '山口・牛沢 集落内', '2023-07-27 06:40:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('c499c387-ed54-4529-8457-47955307ef93', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '森岳温泉 分湯場前', '2023-07-27 06:42:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('d9684867-fe67-4694-bc55-cb8e1f482982', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '森岳温泉 ゆうぱる前', '2023-07-27 06:43:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('96e23062-7911-4a53-8fa3-3b26ddf69406', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '佐藤医院前', '2023-07-27 06:48:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('c4b8acd2-b95d-4bea-bc3d-bfad4449a3bb', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '森岳駅', '2023-07-27 06:49:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('4e7b8101-806c-4088-ae4e-a5a08e1c6410', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '三種町役場本庁', '2023-07-27 07:00:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('800690a5-34c5-4a57-9177-41ad3b5216f4', '9e860e2b-0ffc-464d-84b7-b66926253aa4', '八竜ふれあいセンター', '2023-07-27 07:02:00.000000+09')`,
    );
    // 時刻表（上り 2便）
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('5449998e-e518-4265-98cb-956459714cd2', '4d44a591-5924-4239-a46c-23d8134f9ff2', '蛭沢 近藤三男宅前', '2023-07-27 09:00:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('c3b2bb7e-d783-4624-9bce-f08e38b61080', '4d44a591-5924-4239-a46c-23d8134f9ff2', '外ノ沢 消防小屋前', '2023-07-27 09:03:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('4648c6a6-a14e-4733-b6cf-22e5cdc83c58', '4d44a591-5924-4239-a46c-23d8134f9ff2', '小町 バス停', '2023-07-27 09:06:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('351352cb-8679-4dbc-88a4-559fcfc5b5a8', '4d44a591-5924-4239-a46c-23d8134f9ff2', '中野 バス停', '2023-07-27 09:07:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('1fb9bca8-5722-474e-99e0-b1c59512399f', '4d44a591-5924-4239-a46c-23d8134f9ff2', '宮ノ目 バス停', '2023-07-27 09:08:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('c086f622-73f0-4a1a-aace-3a68f016bfaf', '4d44a591-5924-4239-a46c-23d8134f9ff2', '上長面 近藤鉄義宅前', '2023-07-27 09:09:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('841e3da5-65b0-411a-8bde-a58a64a924e1', '4d44a591-5924-4239-a46c-23d8134f9ff2', '赤川商店前 バス停', '2023-07-27 09:10:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('ee99967d-0ec7-4018-8993-0400e5b9893a', '4d44a591-5924-4239-a46c-23d8134f9ff2', '北貞商店前 バス停', '2023-07-27 09:11:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('fe479e32-bb44-4daa-86f1-a9a614be9833', '4d44a591-5924-4239-a46c-23d8134f9ff2', '不動田 バス停', '2023-07-27 09:12:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('7ed55bd1-fcad-4a10-ae49-138ea5cf550e', '4d44a591-5924-4239-a46c-23d8134f9ff2', '谷地ノ沢入口 バス停', '2023-07-27 09:13:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('96db94d5-abde-4a61-92da-318842d29301', '4d44a591-5924-4239-a46c-23d8134f9ff2', '達子 バス停', '2023-07-27 09:14:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('37739368-b0ef-4c12-ae42-f2bb1472e919', '4d44a591-5924-4239-a46c-23d8134f9ff2', '向達子 バス停', '2023-07-27 09:15:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('8b1ddb14-6ca2-451d-90cf-a2861b59e7a4', '4d44a591-5924-4239-a46c-23d8134f9ff2', '増沢 バス停', '2023-07-27 09:18:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('8902512e-96df-4ecf-b893-123d1b3f3139', '4d44a591-5924-4239-a46c-23d8134f9ff2', '山口・牛沢 集落内', '2023-07-27 09:20:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('7ee81778-9155-4ada-862a-1e36c4fc7eb9', '4d44a591-5924-4239-a46c-23d8134f9ff2', '森岳温泉 分湯場前', '2023-07-27 09:22:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('79aec59f-b6de-4344-ade5-27f5f068bf8f', '4d44a591-5924-4239-a46c-23d8134f9ff2', '森岳温泉 ゆうぱる前', '2023-07-27 09:23:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('15cca8dd-979e-4558-96f5-12df943f61e7', '4d44a591-5924-4239-a46c-23d8134f9ff2', '佐藤医院前', '2023-07-27 09:28:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('1c3181aa-111b-410e-a726-fad6027733cb', '4d44a591-5924-4239-a46c-23d8134f9ff2', '森岳駅', '2023-07-27 09:29:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('439d7ba2-3216-4067-8935-ca9cdc8caa8a', '4d44a591-5924-4239-a46c-23d8134f9ff2', '三種町役場本庁', '2023-07-27 09:40:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('ce86455f-3870-4cd5-8366-7c9df7544e1f', '4d44a591-5924-4239-a46c-23d8134f9ff2', '八竜ふれあいセンター', '2023-07-27 09:42:00.000000+09')`,
    );
    // 時刻表（上り 3便）
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('c07e112b-6bb3-4dff-aba1-4c516ef7647a', '1466f21f-72d2-4c84-b394-da366b82e07a', '蛭沢 近藤三男宅前', '2023-07-27 11:00:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('63d87270-fb28-4139-8750-fa78471d8467', '1466f21f-72d2-4c84-b394-da366b82e07a', '外ノ沢 消防小屋前', '2023-07-27 11:03:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('56bc6d84-5c1f-4057-9d4c-9fa20d7cb163', '1466f21f-72d2-4c84-b394-da366b82e07a', '小町 バス停', '2023-07-27 11:06:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('052b3f98-385e-4a36-9107-f75ad7a86556', '1466f21f-72d2-4c84-b394-da366b82e07a', '中野 バス停', '2023-07-27 11:07:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('8ad89e27-f27c-47a3-8564-87567b00cba5', '1466f21f-72d2-4c84-b394-da366b82e07a', '宮ノ目 バス停', '2023-07-27 11:08:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('9c897b8b-912e-404d-97c4-bfb0215a7e74', '1466f21f-72d2-4c84-b394-da366b82e07a', '上長面 近藤鉄義宅前', '2023-07-27 11:09:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('8cd9cb50-9a27-4d4a-bbac-855ec56bd4d5', '1466f21f-72d2-4c84-b394-da366b82e07a', '赤川商店前 バス停', '2023-07-27 11:10:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('011ca2d1-e1f4-4fc4-a2c1-870fddc7c9fa', '1466f21f-72d2-4c84-b394-da366b82e07a', '北貞商店前 バス停', '2023-07-27 11:11:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('33b84b21-aeab-48bf-8a7a-9fb69dee5660', '1466f21f-72d2-4c84-b394-da366b82e07a', '不動田 バス停', '2023-07-27 11:12:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('009324ce-197e-415b-a1a0-3ab62b2dd5a2', '1466f21f-72d2-4c84-b394-da366b82e07a', '谷地ノ沢入口 バス停', '2023-07-27 11:13:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('4e3780e2-fb8f-4eed-8305-97a66bb4e1db', '1466f21f-72d2-4c84-b394-da366b82e07a', '達子 バス停', '2023-07-27 11:14:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('93851597-e956-407b-9248-128cd2eaf855', '1466f21f-72d2-4c84-b394-da366b82e07a', '向達子 バス停', '2023-07-27 11:15:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('01e84d50-76fd-49f8-bdee-f402c05a0c90', '1466f21f-72d2-4c84-b394-da366b82e07a', '増沢 バス停', '2023-07-27 11:18:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('8226dfbb-2aa3-4ba0-8e40-5119437e7a32', '1466f21f-72d2-4c84-b394-da366b82e07a', '山口・牛沢 集落内', '2023-07-27 11:20:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('066d3c9a-111f-4dbd-92cc-f7b577fb1f40', '1466f21f-72d2-4c84-b394-da366b82e07a', '森岳温泉 分湯場前', '2023-07-27 11:22:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('5a02761f-0f68-4dfa-8fb2-9796bcf396ee', '1466f21f-72d2-4c84-b394-da366b82e07a', '森岳温泉 ゆうぱる前', '2023-07-27 11:23:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('c0f2465f-2b9e-45dc-8a71-c98f383d495c', '1466f21f-72d2-4c84-b394-da366b82e07a', '佐藤医院前', '2023-07-27 11:28:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('55f2beeb-3d41-4aff-a473-e6786c9cce1c', '1466f21f-72d2-4c84-b394-da366b82e07a', '森岳駅', '2023-07-27 11:29:00.000000+09')`,
    );
    // 時刻表（上り 4便）
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('7508f8f2-545a-46ac-9118-28867d44f518', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '蛭沢 近藤三男宅前', '2023-07-27 14:00:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('247db140-1288-476d-b1c9-206b00524999', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '外ノ沢 消防小屋前', '2023-07-27 14:03:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('ac7e4c74-8fab-421e-9198-e294aa2cdc33', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '小町 バス停', '2023-07-27 14:06:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('a391a967-d493-40c5-9e8f-719c70b8de15', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '中野 バス停', '2023-07-27 14:07:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('332ddaa1-e8f2-499f-b6cc-9dbc4f679909', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '宮ノ目 バス停', '2023-07-27 14:08:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('630b0c69-002b-4c34-bec6-70a0dd6866d5', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '上長面 近藤鉄義宅前', '2023-07-27 14:09:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('55fa9e94-d778-4566-8297-a33600246efc', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '赤川商店前 バス停', '2023-07-27 14:10:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('3fd3a732-a9d5-4e5c-a56a-4624b7e6a048', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '北貞商店前 バス停', '2023-07-27 14:11:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('a2d3a5a9-d61b-4fb1-9da9-46addc96e6b6', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '不動田 バス停', '2023-07-27 14:12:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('8caf6f44-ffa5-4d42-98dd-c85cac6fd2e4', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '谷地ノ沢入口 バス停', '2023-07-27 14:13:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('1cf1ef55-7ba6-4eae-9ed9-da1910cf76b7', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '達子 バス停', '2023-07-27 14:14:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('c9babadf-9553-4368-b0a8-3b4a66bc56c4', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '向達子 バス停', '2023-07-27 14:15:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('a152f49f-8eaf-49c4-bfa2-1c5b7fcbd164', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '増沢 バス停', '2023-07-27 14:18:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('78b24dee-9101-46d4-872c-37d6ac5a2c93', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '山口・牛沢 集落内', '2023-07-27 14:20:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('1f97e7d4-bd01-4ff4-8de3-7d2c760c00b1', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '森岳温泉 分湯場前', '2023-07-27 14:22:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('36b61f05-ee7e-4fea-8a5f-95791bca3025', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '森岳温泉 ゆうぱる前', '2023-07-27 14:23:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('b8887e03-ca2f-43f5-a446-4b289e074c6f', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '佐藤医院前', '2023-07-27 14:28:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('b1df3499-1e67-4f72-a60e-e0688cc4f188', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '森岳駅', '2023-07-27 14:29:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('6334a656-88e8-4d81-a9db-fa1128bea75a', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '三種町役場本庁', '2023-07-27 14:40:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('059650c1-d670-4898-8862-77416f16e716', '71726b3c-dd4e-4e2e-afb7-d032d4cc0b95', '八竜ふれあいセンター', '2023-07-27 14:42:00.000000+09')`,
    );
    // 時刻表（上り 5便）
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('3336d359-7170-478a-b935-c0f1dcd5db17', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '蛭沢 近藤三男宅前', '2023-07-27 16:00:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('390d281c-31b1-46c0-83b5-1ea076da28c2', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '外ノ沢 消防小屋前', '2023-07-27 16:03:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('b84659ee-901d-4dac-91dc-b0f186e57fb7', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '小町 バス停', '2023-07-27 16:06:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('12b74432-99f0-4439-b53d-ec4a7f16a57c', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '中野 バス停', '2023-07-27 16:07:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('b2993c14-614b-48c1-8183-5e10761c8e20', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '宮ノ目 バス停', '2023-07-27 16:08:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('8077518a-4f03-4bbd-94df-a5117e458899', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '上長面 近藤鉄義宅前', '2023-07-27 16:09:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('0a39dfe3-fac3-4abd-a15a-cec7e262f920', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '赤川商店前 バス停', '2023-07-27 16:10:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('92f3d662-0c9b-4e76-90c6-4c2e21f24f26', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '北貞商店前 バス停', '2023-07-27 16:11:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('cd246e23-9712-4a80-95ef-6a374026bba0', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '不動田 バス停', '2023-07-27 16:12:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('919027f8-c486-4393-b2ac-c8e829dd3853', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '谷地ノ沢入口 バス停', '2023-07-27 16:13:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('902815a1-c5d9-4de0-b743-cf4bb47e5f21', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '達子 バス停', '2023-07-27 16:14:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('568dd986-cde3-4a71-af5e-ae3c97c1ed56', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '向達子 バス停', '2023-07-27 16:15:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('9d3a37fd-5f3a-49c8-bc2b-9d8af793016d', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '増沢 バス停', '2023-07-27 16:18:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('0271b951-ed34-4a64-9be6-04913850eb2e', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '山口・牛沢 集落内', '2023-07-27 16:20:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('b7aa35de-74e7-40fd-bbbe-47e0c2793324', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '森岳温泉 分湯場前', '2023-07-27 16:22:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('b6252454-8d20-4424-842e-75f4835bb5d0', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '森岳温泉 ゆうぱる前', '2023-07-27 16:23:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('62d897af-ded2-4465-b59f-1a4d22291352', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '佐藤医院前', '2023-07-27 16:28:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('9709ad3f-88bf-47bf-9870-6a309329089b', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '森岳駅', '2023-07-27 16:32:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('91908ee2-c4bf-4795-bee1-ebe4777bc63a', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '三種町役場本庁', '2023-07-27 16:43:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('1ea2054c-8365-42f8-9801-bf007dd0e2bf', '5fbb8335-e596-4d6d-b7a4-30b71dbd540b', '八竜ふれあいセンター', '2023-07-27 16:45:00.000000+09')`,
    );
    // 時刻表（下り 1便）
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('3c8e4e3d-1073-4b8c-8fa9-186b8f35f77c', 'f5303601-e7bb-4277-af09-8a9750c30b11', '八竜ふれあいセンター', '2023-07-27 07:31:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('8a7c8cf1-173d-4dbd-8890-7128b024d899', 'f5303601-e7bb-4277-af09-8a9750c30b11', '三種町役場本庁', '2023-07-27 07:33:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('d34351a6-397c-4f14-819d-757093b6b343', 'f5303601-e7bb-4277-af09-8a9750c30b11', '和田', '2023-07-27 07:48:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('a941c9fe-0fa8-4734-ab4d-1a14c21bbedb', 'f5303601-e7bb-4277-af09-8a9750c30b11', '森岳駅', '2023-07-27 07:44:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('5b67eab7-143a-444b-bf9a-adf14bc04c8d', 'f5303601-e7bb-4277-af09-8a9750c30b11', '佐藤医院前', '2023-07-27 07:45:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('2378ba1d-fc1a-470f-84d0-1f4ec1517412', 'f5303601-e7bb-4277-af09-8a9750c30b11', '森岳温泉 ゆうぱる前', '2023-07-27 07:50:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('dd387b81-dd5f-4cf8-aa8f-95cf9a710291', 'f5303601-e7bb-4277-af09-8a9750c30b11', '森岳温泉 分湯場前', '2023-07-27 07:51:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('5e2f8a83-2fb1-4891-88aa-b2b705268024', 'f5303601-e7bb-4277-af09-8a9750c30b11', '山口・牛沢 集落内', '2023-07-27 07:53:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('acfcc2d4-5cf1-43f6-95bb-2eab352000a1', 'f5303601-e7bb-4277-af09-8a9750c30b11', '増沢 バス停', '2023-07-27 07:55:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('8b54cfa9-eae3-4d99-b41b-717dfaa3f86a', 'f5303601-e7bb-4277-af09-8a9750c30b11', '向達子 バス停', '2023-07-27 07:56:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('f3e1702a-6f3f-485b-bbd2-6cb7cd8c20e1', 'f5303601-e7bb-4277-af09-8a9750c30b11', '達子 バス停', '2023-07-27 07:57:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('38d8048c-ff8b-48af-887e-2ddfb269d7d8', 'f5303601-e7bb-4277-af09-8a9750c30b11', '谷地ノ沢入口 バス停', '2023-07-27 07:58:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('4f753672-993c-4c70-87f4-2e0f33bf6608', 'f5303601-e7bb-4277-af09-8a9750c30b11', '不動田 バス停', '2023-07-27 07:59:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('6bb95afa-1cea-4b22-a082-68acf6329d0d', 'f5303601-e7bb-4277-af09-8a9750c30b11', '北貞商店前 バス停', '2023-07-27 08:00:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('3b1a9b09-8f7a-4ef9-98fd-42a67014ebba', 'f5303601-e7bb-4277-af09-8a9750c30b11', '赤川商店前 バス停', '2023-07-27 08:01:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('5bb42058-505d-4aed-9bae-7807bc3635bf', 'f5303601-e7bb-4277-af09-8a9750c30b11', '上長面 近藤鉄義宅前', '2023-07-27 08:02:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('b77b9423-d93e-4101-9f28-1b8611ff2afe', 'f5303601-e7bb-4277-af09-8a9750c30b11', '宮ノ目 バス停', '2023-07-27 08:03:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('fe9f92b9-d92e-4bb9-92af-eb25b148d36f', 'f5303601-e7bb-4277-af09-8a9750c30b11', '中野 バス停', '2023-07-27 08:04:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('318f5cc6-66a7-4796-87f2-0f8c228c5433', 'f5303601-e7bb-4277-af09-8a9750c30b11', '小町 バス停', '2023-07-27 08:05:00.000000+09')`,
    );
    // 時刻表（下り 2便）
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('0c4ab8c5-22c5-42b4-ace0-ffffbe91802c', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '八竜ふれあいセンター', '2023-07-27 10:01:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('8178ccb5-908a-43df-9a38-57fdcf945cdf', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '三種町役場本庁', '2023-07-27 10:03:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('28782e95-9058-4f77-ae0c-bbf8ab580420', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '和田', '2023-07-27 10:08:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('f7537b7a-35cb-4e1f-a4b3-5dd8d0d513d9', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '森岳駅', '2023-07-27 10:14:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('b55e7772-344d-421d-8854-0c36ca72703e', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '佐藤医院前', '2023-07-27 10:15:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('49a5fae7-4988-4745-a86e-4bbf871c2f3b', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '森岳温泉 ゆうぱる前', '2023-07-27 10:20:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('e60d4448-a8bd-495d-9080-46d76d5cd709', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '森岳温泉 分湯場前', '2023-07-27 10:21:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('a29f67e5-d142-4b30-92fe-b08daa4bdbbb', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '山口・牛沢 集落内', '2023-07-27 10:23:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('163fb913-9ffb-49d3-a4ac-6c2279daa87b', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '増沢 バス停', '2023-07-27 10:25:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('d59c1648-0351-493d-be07-2fd955fe724e', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '向達子 バス停', '2023-07-27 10:26:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('956487f0-cc02-4652-b819-f6de976ed10d', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '達子 バス停', '2023-07-27 10:27:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('6ba2c24f-45c5-4a9f-a073-3c89d3039411', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '谷地ノ沢入口 バス停', '2023-07-27 10:28:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('384ef621-2b49-4e2b-8033-cb735f473ac6', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '不動田 バス停', '2023-07-27 10:29:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('9ff5169b-38a5-4df6-801e-223c61607544', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '北貞商店前 バス停', '2023-07-27 10:30:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('dff5bc35-2522-495b-b36e-5c9657640fb9', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '赤川商店前 バス停', '2023-07-27 10:31:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('1b6c28a4-05c6-4be0-8690-f31c117a6b24', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '上長面 近藤鉄義宅前', '2023-07-27 10:32:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('99ee7c5a-d52b-4cdd-8b5c-824934ee93db', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '宮ノ目 バス停', '2023-07-27 10:33:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('4df181a0-51d0-4fcb-a799-79830dce2059', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '中野 バス停', '2023-07-27 10:34:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('bde8128f-1b89-4f2e-92bf-a74b0321aece', '5a041d1c-52b9-4c3b-aaa4-125478729c39', '小町 バス停', '2023-07-27 10:35:00.000000+09')`,
    );
    // 時刻表（下り 3便）
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('fb07cc46-b32a-4d20-8b1a-fb2d85dbaaf4', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '森岳駅', '2023-07-27 11:50:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('c1f8ec33-9ef0-46b0-9da3-85f547048d09', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '佐藤医院前', '2023-07-27 11:51:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('2e3a820b-4317-47d4-a65a-df5f2b2f86fb', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '森岳温泉 ゆうぱる前', '2023-07-27 11:56:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('1b399e1f-d722-4912-b7d2-eda54c9307f9', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '森岳温泉 分湯場前', '2023-07-27 11:57:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('bdb656c9-d879-407b-bf70-cf2f628abdaf', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '山口・牛沢 集落内', '2023-07-27 11:59:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('c4b3a4ea-f0bc-4639-a49f-c9b2a0f801c3', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '増沢 バス停', '2023-07-27 12:01:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('c65ae11c-22a1-4b51-9d3f-41ca2058537d', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '向達子 バス停', '2023-07-27 12:02:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('e4f05f4a-d4dc-4431-8e61-61b8bdeb5f33', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '達子 バス停', '2023-07-27 12:03:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('0ebc3781-db9f-4e3c-8305-6fbb74ad37ed', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '谷地ノ沢入口 バス停', '2023-07-27 12:04:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('d0ef713f-e837-48e8-b580-d37c94e6804c', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '不動田 バス停', '2023-07-27 12:05:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('148f7846-e257-4f2f-a5eb-4628ca419b05', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '北貞商店前 バス停', '2023-07-27 12:06:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('66c14051-cde1-4701-8c81-7282b61fc4c8', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '赤川商店前 バス停', '2023-07-27 12:07:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('c4a77df0-c044-4f97-9576-1b3d4c5512d8', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '上長面 近藤鉄義宅前', '2023-07-27 12:08:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('a2e344f2-b22a-4e99-a4de-6f1926058a6a', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '宮ノ目 バス停', '2023-07-27 12:09:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('7f7e8b1d-30fc-4298-89d5-ac1853b6280e', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '中野 バス停', '2023-07-27 12:10:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('af83b80e-dda6-4a7d-bbe2-44e59ee3ac5a', '116435fa-5adf-46a7-a00b-36b2bd7a7aff', '小町 バス停', '2023-07-27 12:11:00.000000+09')`,
    );
    // 時刻表（下り 4便）
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('08d7d431-8520-4052-af06-de6de6ff4d01', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '八竜ふれあいセンター', '2023-07-27 15:01:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('5ecc7297-c6ef-4f81-ae81-4710ffb86308', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '三種町役場本庁', '2023-07-27 15:03:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('29cb91dd-4c3c-4565-afd7-002279aebc0d', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '和田', '2023-07-27 15:08:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('c21f8f99-b043-406d-9acc-81f34b237dba', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '森岳駅', '2023-07-27 15:14:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('1c94b434-5a2f-4c0b-8352-bfa75fe46448', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '佐藤医院前', '2023-07-27 15:15:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('74a64723-5396-4dd1-827c-2fe613bea78a', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '森岳温泉 ゆうぱる前', '2023-07-27 15:20:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('01196fa2-ada9-4991-90ce-05b8075a46de', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '森岳温泉 分湯場前', '2023-07-27 15:21:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('506a48d2-914c-43e3-a15c-d429e0cae69b', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '山口・牛沢 集落内', '2023-07-27 15:23:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('fa5a9f71-2686-4337-9c45-2d006d57d407', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '増沢 バス停', '2023-07-27 15:25:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('4c317623-b8f3-44f1-b6d7-66222b506fd3', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '向達子 バス停', '2023-07-27 15:26:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('234af49a-23e5-4ac0-a3c2-bd491719ab8f', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '達子 バス停', '2023-07-27 15:27:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('4b90d72d-5371-4c48-9ce7-27387db42b94', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '谷地ノ沢入口 バス停', '2023-07-27 15:25:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('6c9fe983-2021-4c6d-a2ae-2469a4795ce4', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '不動田 バス停', '2023-07-27 15:29:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('a34bc8ce-25ea-49d1-b0e1-59746bf95546', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '北貞商店前 バス停', '2023-07-27 15:30:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('0c126099-5c90-4a12-9bc1-1d2b45c9de0f', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '赤川商店前 バス停', '2023-07-27 15:31:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('97ff6583-949c-4fb0-83de-9d662f408092', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '上長面 近藤鉄義宅前', '2023-07-27 15:32:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('095c91ee-802e-4a34-bcb4-50527f2c9e35', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '宮ノ目 バス停', '2023-07-27 15:33:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('6cf5e61f-0711-42c5-a066-61cbdde0813e', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '中野 バス停', '2023-07-27 15:34:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('ab5a0259-dc7f-4b2e-8ab9-409b950a72ac', '612ce9a2-810d-48b5-b54a-b87b75612c9e', '小町 バス停', '2023-07-27 15:35:00.000000+09')`,
    );
    // 時刻表（下り 5便）
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('aa529c9b-77c3-4709-a435-9d40d0bd0177', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '八竜ふれあいセンター', '2023-07-27 17:01:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('d1600bec-bfe5-42e3-b11f-94c312274c56', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '三種町役場本庁', '2023-07-27 17:03:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('2b16e2cc-281b-40e0-a169-6b7ddfa4d52a', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '和田', '2023-07-27 17:08:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('8c3ed752-d7dc-4be8-b162-10be20e07629', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '森岳駅', '2023-07-27 17:14:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('83796f42-760c-49f6-88c7-696b85eab092', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '佐藤医院前', '2023-07-27 17:15:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('c44bcd0c-7d61-4a01-96eb-55c8ea4a2fac', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '森岳温泉 ゆうぱる前', '2023-07-27 17:20:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('5f3fd639-5466-4fc0-b5af-b2708ca94e8d', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '森岳温泉 分湯場前', '2023-07-27 17:21:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('213875ac-5285-4919-900d-4e35c641b290', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '山口・牛沢 集落内', '2023-07-27 17:23:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('da261320-2298-4c95-a521-8fbb5c7357c4', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '増沢 バス停', '2023-07-27 17:25:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('32098ede-6c6a-437e-85aa-958af0e7810b', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '向達子 バス停', '2023-07-27 17:26:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('78c12be1-e768-440b-967f-052eabe85cd9', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '達子 バス停', '2023-07-27 17:27:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('8aee4e6e-a9dc-4eac-9ece-dff270009f5e', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '谷地ノ沢入口 バス停', '2023-07-27 17:25:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('d919d079-f9d2-4abf-8c22-67229aacf0a2', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '不動田 バス停', '2023-07-27 17:29:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('d9e69d64-bd7b-4e47-9334-2007fb81068a', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '北貞商店前 バス停', '2023-07-27 17:30:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('42de98fe-ff10-462e-9da3-0d5a79d56ed0', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '赤川商店前 バス停', '2023-07-27 17:31:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('7d83bfb4-eb17-4a82-9fa6-471ac7a29d10', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '上長面 近藤鉄義宅前', '2023-07-27 17:32:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('70868f35-6e31-4f6e-8dd9-69ca2029f8a0', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '宮ノ目 バス停', '2023-07-27 17:33:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('b7fada51-348f-4ba5-a204-8f717945c490', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '中野 バス停', '2023-07-27 17:34:00.000000+09')`,
    );
    await queryRunner.query(
      `INSERT INTO timetable (id, trip_id, stop, time) VALUES ('99f5a892-dcb4-49b7-9b91-291616014935', 'b3ba9859-9886-4b39-b676-e401d6cc7e58', '小町 バス停', '2023-07-27 17:35:00.000000+09')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // システム混載定義
    await queryRunner.query(`DELETE FROM system_consolidation_define WHERE id='d7842174-a712-4606-9e77-4ed76569266f'`);
    await queryRunner.query(`DELETE FROM system_consolidation_define WHERE id='c5da3a3e-8d6b-48df-b697-7e234f1f9a78'`);
    await queryRunner.query(`DELETE FROM system_consolidation_define WHERE id='428097b2-690c-4f90-8fcc-be50d131c76f'`);
    await queryRunner.query(`DELETE FROM system_consolidation_define WHERE id='856f1efb-7aa4-4128-88f5-1a8e2584a483'`);

    // TODO: 現状は物流業者向け物流設定を行うUIがないためマスターデータとして作成する（UI対応後に削除予定）
    await queryRunner.query(`DELETE FROM account WHERE id='0083fc30-15fc-4ad5-916d-2e367ffd5bc2'`);
  }

  private async hashedPassword(password = DEFAULT_PASSWORD) {
    return await bcrypt.hash(password, await bcrypt.genSalt());
  }
}
