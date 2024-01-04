/*
  Warnings:

  - You are about to drop the column `name` on the `orgs` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "orgs_name_key";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "name";
