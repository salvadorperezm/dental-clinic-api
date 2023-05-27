import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatingSuppliersTableAndUpdatingMaterialsTable1685212079072 implements MigrationInterface {
    name = 'CreatingSuppliersTableAndUpdatingMaterialsTable1685212079072'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "suppliers" ("id" SERIAL NOT NULL, "supplierName" character varying NOT NULL, "supplierAddress" character varying NOT NULL, "supplierEmail" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_b70ac51766a9e3144f778cfe81e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "materials" ADD "supplierId" integer`);
        await queryRunner.query(`ALTER TABLE "materials" ADD CONSTRAINT "FK_fd31b11d8c1a03bf742c1e674a4" FOREIGN KEY ("supplierId") REFERENCES "suppliers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "materials" DROP CONSTRAINT "FK_fd31b11d8c1a03bf742c1e674a4"`);
        await queryRunner.query(`ALTER TABLE "materials" DROP COLUMN "supplierId"`);
        await queryRunner.query(`DROP TABLE "suppliers"`);
    }

}
