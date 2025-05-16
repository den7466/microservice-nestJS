import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitTransaction1746202518109 implements MigrationInterface {
  name = 'InitTransaction1746202518109';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "transaction" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "trans_id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "amount" character varying NOT NULL, "type" "public"."transaction_type_enum" NOT NULL, CONSTRAINT "PK_1c251606f67529e543dafb817c1" PRIMARY KEY ("trans_id")); COMMENT ON COLUMN "transaction"."trans_id" IS 'Идентификатор транзакции'; COMMENT ON COLUMN "transaction"."user_id" IS 'Идентификатор пользователя, совершающего транзакцию'; COMMENT ON COLUMN "transaction"."amount" IS 'Сумма транзакции'; COMMENT ON COLUMN "transaction"."type" IS 'Тип транзакции'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "transaction"`);
  }
}
