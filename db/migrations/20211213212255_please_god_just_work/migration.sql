/*
  Warnings:

  - Added the required column `typeId` to the `Subtype` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subtype" ADD COLUMN     "typeId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Subtype" ADD CONSTRAINT "Subtype_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
