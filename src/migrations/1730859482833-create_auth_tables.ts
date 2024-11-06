import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAuthTables1730859482833 implements MigrationInterface {
  name = 'CreateAuthTables1730859482833';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "mobile" character varying NOT NULL, "password" character varying NOT NULL, "name" character varying(100) NOT NULL, "email" character varying(255) NOT NULL, "is_verified" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_d376a9f93bba651f32a2c03a7d3" UNIQUE ("mobile"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e859d7c05d4aeb5e1f25f79865b" UNIQUE ("name"), CONSTRAINT "PK_0428f484e96f9e6a55955f29b5f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_requests" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "code" character varying NOT NULL, "completed" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "expires_at" TIMESTAMP, "user_id" uuid, "request_id" uuid, CONSTRAINT "PK_b144147b72ee6fb3d4a9147073e" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "sessions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "token" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "expires_at" TIMESTAMP NOT NULL, "user_id" uuid, CONSTRAINT "PK_3238ef96f18b355b671619111bc" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_requests" ADD CONSTRAINT "FK_93a52df8163601a2fc0786dd5c5" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_requests" ADD CONSTRAINT "FK_6995341ff6f53e440a1635cae86" FOREIGN KEY ("request_id") REFERENCES "requests"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "sessions" ADD CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sessions" DROP CONSTRAINT "FK_085d540d9f418cfbdc7bd55bb19"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_requests" DROP CONSTRAINT "FK_6995341ff6f53e440a1635cae86"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_requests" DROP CONSTRAINT "FK_93a52df8163601a2fc0786dd5c5"`,
    );
    await queryRunner.query(`DROP TABLE "sessions"`);
    await queryRunner.query(`DROP TABLE "user_requests"`);
    await queryRunner.query(`DROP TABLE "requests"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
