/*
  Warnings:

  - You are about to drop the column `typeId` on the `Subtype` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subtype" DROP CONSTRAINT "Subtype_typeId_fkey";

-- AlterTable
ALTER TABLE "Subtype" DROP COLUMN "typeId";

-- AlterTable
ALTER TABLE "Type" ALTER COLUMN "name" DROP NOT NULL;
