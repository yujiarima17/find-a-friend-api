/*
  Warnings:

  - The values [BAIXO,ALTO] on the enum `DependecyLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [BAIXA,ALTA] on the enum `EnergyLevel` will be removed. If these variants are still used in the database, this will fail.
  - The values [ABERTO,FECHADO] on the enum `Environment` will be removed. If these variants are still used in the database, this will fail.
  - The values [PEQUENINO,MEDIO,GRANDE] on the enum `PetSize` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "PetAge" AS ENUM ('Filhote', 'Adulto');

-- AlterEnum
BEGIN;
CREATE TYPE "DependecyLevel_new" AS ENUM ('Baixo', 'Alto');
ALTER TABLE "pets" ALTER COLUMN "dependency_level" TYPE "DependecyLevel_new" USING ("dependency_level"::text::"DependecyLevel_new");
ALTER TYPE "DependecyLevel" RENAME TO "DependecyLevel_old";
ALTER TYPE "DependecyLevel_new" RENAME TO "DependecyLevel";
DROP TYPE "DependecyLevel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EnergyLevel_new" AS ENUM ('Baixa', 'Alta');
ALTER TABLE "pets" ALTER COLUMN "energy" TYPE "EnergyLevel_new" USING ("energy"::text::"EnergyLevel_new");
ALTER TYPE "EnergyLevel" RENAME TO "EnergyLevel_old";
ALTER TYPE "EnergyLevel_new" RENAME TO "EnergyLevel";
DROP TYPE "EnergyLevel_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Environment_new" AS ENUM ('Aberto', 'Fechado');
ALTER TABLE "pets" ALTER COLUMN "environment" TYPE "Environment_new" USING ("environment"::text::"Environment_new");
ALTER TYPE "Environment" RENAME TO "Environment_old";
ALTER TYPE "Environment_new" RENAME TO "Environment";
DROP TYPE "Environment_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PetSize_new" AS ENUM ('Pequenino', 'Medio', 'Grande');
ALTER TABLE "pets" ALTER COLUMN "size" TYPE "PetSize_new" USING ("size"::text::"PetSize_new");
ALTER TYPE "PetSize" RENAME TO "PetSize_old";
ALTER TYPE "PetSize_new" RENAME TO "PetSize";
DROP TYPE "PetSize_old";
COMMIT;
