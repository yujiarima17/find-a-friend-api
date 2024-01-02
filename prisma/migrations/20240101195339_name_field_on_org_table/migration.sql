/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `orgs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orgs" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "orgs_name_key" ON "orgs"("name");
