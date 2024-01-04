/*
  Warnings:

  - You are about to drop the column `address_id` on the `orgs` table. All the data in the column will be lost.
  - You are about to drop the `Address` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `adress` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adress_number` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cep` to the `orgs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `orgs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orgs" DROP CONSTRAINT "orgs_address_id_fkey";

-- DropIndex
DROP INDEX "orgs_address_id_key";

-- AlterTable
ALTER TABLE "orgs" DROP COLUMN "address_id",
ADD COLUMN     "adress" TEXT NOT NULL,
ADD COLUMN     "adress_number" INTEGER NOT NULL,
ADD COLUMN     "cep" TEXT NOT NULL,
ADD COLUMN     "owner" TEXT NOT NULL;

-- DropTable
DROP TABLE "Address";
