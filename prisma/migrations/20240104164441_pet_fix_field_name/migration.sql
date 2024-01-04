/*
  Warnings:

  - You are about to drop the column `depedency_level` on the `pets` table. All the data in the column will be lost.
  - Added the required column `dependency_level` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pets" DROP COLUMN "depedency_level",
ADD COLUMN     "dependency_level" "DependecyLevel" NOT NULL;
