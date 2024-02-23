import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAge1708711398975 implements MigrationInterface {
    name = 'AddAge1708711398975'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "age" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
    }

}
