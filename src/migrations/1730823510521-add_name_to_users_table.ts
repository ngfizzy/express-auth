import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameToUsersTable1730823510521 implements MigrationInterface {
  name = 'AddNameToUsersTable1730823510521';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "name" character varying(100) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
  }
}
