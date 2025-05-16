import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexForLoginAndPhone1746191669036
  implements MigrationInterface
{
  name = 'AddIndexForLoginAndPhone1746191669036';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a62473490b3e4578fd683235c5"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_207dec28c1b5028d8658d9a6f1" ON "user" ("login", "phone") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_207dec28c1b5028d8658d9a6f1"`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `,
    );
  }
}
