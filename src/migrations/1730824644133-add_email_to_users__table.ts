import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEmailToUsers_table1730824644133 implements MigrationInterface {
  name = 'AddEmailToUsers_table1730824644133';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "email" character varying(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
  }
}
