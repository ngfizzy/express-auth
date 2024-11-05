import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveIntermediateTableBetweenRequestAndUserRequests1730756707116
  implements MigrationInterface
{
  name = 'RemoveIntermediateTableBetweenRequestAndUserRequests1730756707116';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_requests" DROP CONSTRAINT "FK_91e07001c08e1a5084b5e0b2dbe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_requests" DROP CONSTRAINT "REL_91e07001c08e1a5084b5e0b2db"`,
    );
    await queryRunner.query(`ALTER TABLE "user_requests" DROP COLUMN "auth_code_id"`);
    await queryRunner.query(`ALTER TABLE "user_requests" ADD "code" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user_requests" ADD "completed" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(`ALTER TABLE "user_requests" ADD "expires_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user_requests" DROP COLUMN "expires_at"`);
    await queryRunner.query(`ALTER TABLE "user_requests" DROP COLUMN "completed"`);
    await queryRunner.query(`ALTER TABLE "user_requests" DROP COLUMN "code"`);
    await queryRunner.query(`ALTER TABLE "user_requests" ADD "auth_code_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "user_requests" ADD CONSTRAINT "REL_91e07001c08e1a5084b5e0b2db" UNIQUE ("auth_code_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_requests" ADD CONSTRAINT "FK_91e07001c08e1a5084b5e0b2dbe" FOREIGN KEY ("auth_code_id") REFERENCES "request_auth_codes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
