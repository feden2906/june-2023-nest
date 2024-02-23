import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1708711107010 implements MigrationInterface {
    name = 'FirstMigration1708711107010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" (
            "id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text, "email" text NOT NULL, "password" text NOT NULL, "created" TIMESTAMP NOT NULL DEFAULT now(), "updated" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
