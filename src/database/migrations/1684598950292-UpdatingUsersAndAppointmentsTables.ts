import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdatingUsersAndAppointmentsTables1684598950292 implements MigrationInterface {
    name = 'UpdatingUsersAndAppointmentsTables1684598950292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointments" ("id" SERIAL NOT NULL, "scheduledDate" character varying NOT NULL, "isConfirmed" boolean NOT NULL DEFAULT false, "isCompleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users_appointments_appointments" ("usersId" integer NOT NULL, "appointmentsId" integer NOT NULL, CONSTRAINT "PK_727987ca42c97ebc41128d45de5" PRIMARY KEY ("usersId", "appointmentsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e0a813f9530f503ee65f86ab02" ON "users_appointments_appointments" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_29a8fae96ab5cc948be2cdba12" ON "users_appointments_appointments" ("appointmentsId") `);
        await queryRunner.query(`ALTER TABLE "users_appointments_appointments" ADD CONSTRAINT "FK_e0a813f9530f503ee65f86ab022" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_appointments_appointments" ADD CONSTRAINT "FK_29a8fae96ab5cc948be2cdba122" FOREIGN KEY ("appointmentsId") REFERENCES "appointments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_appointments_appointments" DROP CONSTRAINT "FK_29a8fae96ab5cc948be2cdba122"`);
        await queryRunner.query(`ALTER TABLE "users_appointments_appointments" DROP CONSTRAINT "FK_e0a813f9530f503ee65f86ab022"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_29a8fae96ab5cc948be2cdba12"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e0a813f9530f503ee65f86ab02"`);
        await queryRunner.query(`DROP TABLE "users_appointments_appointments"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
    }

}
