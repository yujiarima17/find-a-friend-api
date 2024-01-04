/*
  Warnings:

  - Changed the type of `dependency_level` on the `pets` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DependencyLevel" AS ENUM ('Baixo', 'Alto');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "dependency_level",
ADD COLUMN     "dependency_level" "DependencyLevel" NOT NULL;

-- DropEnum
DROP TYPE "DependecyLevel";
