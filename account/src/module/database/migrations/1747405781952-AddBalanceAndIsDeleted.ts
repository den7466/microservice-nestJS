import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBalanceAndIsDeleted1747405781952 implements MigrationInterface {
  name = 'AddBalanceAndIsDeleted1747405781952';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ADD "balance" character varying NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."balance" IS 'Баланс пользователя'`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isDeleted" boolean DEFAULT false`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."isDeleted" IS 'Был ли удален аккаунт'`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a62473490b3e4578fd683235c5"`,
    );
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."isDeleted" IS 'Был ли удален аккаунт'`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isDeleted"`);
    await queryRunner.query(
      `COMMENT ON COLUMN "user"."balance" IS 'Баланс пользователя'`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "balance"`);
  }
}
