import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexForFieldLogin1746191003473 implements MigrationInterface {
  name = 'AddIndexForFieldLogin1746191003473';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_a62473490b3e4578fd683235c5" ON "user" ("login") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_a62473490b3e4578fd683235c5"`,
    );
  }
}
