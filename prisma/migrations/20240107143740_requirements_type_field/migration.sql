/*
  Warnings:

  - The `requirements` column on the `pets` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "requirements",
ADD COLUMN     "requirements" TEXT[];
