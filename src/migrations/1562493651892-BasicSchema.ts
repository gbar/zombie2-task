import { MigrationInterface, QueryRunner } from "typeorm";

export class BasicSchema1562493651892 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`CREATE TABLE "currency" ("code" text NOT NULL, "currency" text NOT NULL, "bid" numeric(12,4) NOT NULL, "ask" numeric(12,4) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_723472e41cae44beb0763f4039c" PRIMARY KEY ("code"))`);
    await queryRunner.query(`CREATE TABLE "zombie_item" ("id" integer NOT NULL, "name" text NOT NULL, "price" numeric(12,2) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_eca2fe7aa83bcc7f5479acb8ea1" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "zombie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "items" jsonb NOT NULL DEFAULT '[]', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_37c1a89a1bfef615abd4ac2b56a" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "zombie"`);
    await queryRunner.query(`DROP TABLE "zombie_item"`);
    await queryRunner.query(`DROP TABLE "currency"`);
  }
}
