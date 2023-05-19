import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatingAppointmentsTableAndUsersAppointmentPivotTable1684517693577 implements MigrationInterface {
    name = 'CreatingAppointmentsTableAndUsersAppointmentPivotTable1684517693577'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointments" ("id" SERIAL NOT NULL, "scheduledDate" character varying NOT NULL, "isConfirmed" boolean NOT NULL DEFAULT false, "isCompleted" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_4a437a9a27e948726b8bb3e36ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointments_users_users" ("appointmentsId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_e1a28fb96c337192ca6daf0d086" PRIMARY KEY ("appointmentsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d1a6e863224a3073144bcce542" ON "appointments_users_users" ("appointmentsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c0774783133fc2e9294a49f9ec" ON "appointments_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "appointments_users_users" ADD CONSTRAINT "FK_d1a6e863224a3073144bcce5421" FOREIGN KEY ("appointmentsId") REFERENCES "appointments"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "appointments_users_users" ADD CONSTRAINT "FK_c0774783133fc2e9294a49f9ec6" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointments_users_users" DROP CONSTRAINT "FK_c0774783133fc2e9294a49f9ec6"`);
        await queryRunner.query(`ALTER TABLE "appointments_users_users" DROP CONSTRAINT "FK_d1a6e863224a3073144bcce5421"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c0774783133fc2e9294a49f9ec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d1a6e863224a3073144bcce542"`);
        await queryRunner.query(`DROP TABLE "appointments_users_users"`);
        await queryRunner.query(`DROP TABLE "appointments"`);
    }

}
