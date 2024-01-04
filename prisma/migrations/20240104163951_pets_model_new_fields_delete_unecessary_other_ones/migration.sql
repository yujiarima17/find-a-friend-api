/*
  Warnings:

  - You are about to drop the column `breed` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `characteristics` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `pets` table. All the data in the column will be lost.
  - You are about to drop the column `is_adopted` on the `pets` table. All the data in the column will be lost.
  - Added the required column `about_me` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `depedency_level` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energy` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `environment` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requirements` to the `pets` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size` to the `pets` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('PEQUENINO', 'MEDIO', 'GRANDE');

-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('BAIXA', 'ALTA');

-- CreateEnum
CREATE TYPE "DependecyLevel" AS ENUM ('BAIXO', 'ALTO');

-- CreateEnum
CREATE TYPE "Environment" AS ENUM ('ABERTO', 'FECHADO');

-- AlterTable
ALTER TABLE "pets" DROP COLUMN "breed",
DROP COLUMN "characteristics",
DROP COLUMN "color",
DROP COLUMN "created_at",
DROP COLUMN "is_adopted",
ADD COLUMN     "about_me" TEXT NOT NULL,
ADD COLUMN     "depedency_level" "DependecyLevel" NOT NULL,
ADD COLUMN     "energy" "EnergyLevel" NOT NULL,
ADD COLUMN     "environment" "Environment" NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT NOT NULL,
ADD COLUMN     "requirements" TEXT NOT NULL,
ADD COLUMN     "size" "PetSize" NOT NULL,
ALTER COLUMN "age" SET DATA TYPE TEXT;
