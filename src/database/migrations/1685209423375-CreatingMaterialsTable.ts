import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatingMaterialsTable1685209423375 implements MigrationInterface {
    name = 'CreatingMaterialsTable1685209423375'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "materials" ("id" SERIAL NOT NULL, "materialName" character varying NOT NULL, "materialDescription" character varying NOT NULL, "materialQuantity" integer NOT NULL, "materialUnitOfMeasure" character varying NOT NULL, "materialCost" integer NOT NULL, "materialExpiryDate" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_2fd1a93ecb222a28bef28663fa0" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "materials"`);
    }

}
