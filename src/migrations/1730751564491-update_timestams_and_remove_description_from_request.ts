import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateTimestamsAndRemoveDescriptionFromRequest1730751564491
  implements MigrationInterface
{
  name = 'UpdateTimestamsAndRemoveDescriptionFromRequest1730751564491';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "UQ_78441702d742a61c1e7f09116f0"`,
    );
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "description"`);
    await queryRunner.query(`ALTER TABLE "requests" ADD "name" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "UQ_e859d7c05d4aeb5e1f25f79865b" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `ALTER TABLE "requests" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_requests" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_requests" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "request_auth_codes" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "request_auth_codes" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "user_requests" DROP COLUMN "updated_at"`);
    await queryRunner.query(`ALTER TABLE "user_requests" DROP COLUMN "created_at"`);
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "updated_at"`);
    await queryRunner.query(
      `ALTER TABLE "requests" DROP CONSTRAINT "UQ_e859d7c05d4aeb5e1f25f79865b"`,
    );
    await queryRunner.query(`ALTER TABLE "requests" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "requests" ADD "description" text NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "requests" ADD CONSTRAINT "UQ_78441702d742a61c1e7f09116f0" UNIQUE ("description")`,
    );
  }
}
