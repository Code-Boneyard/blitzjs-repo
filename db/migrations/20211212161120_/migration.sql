-- AlterTable
ALTER TABLE "Project" ADD COLUMN "address1" TEXT;
ALTER TABLE "Project" ADD COLUMN "address2" TEXT;
ALTER TABLE "Project" ADD COLUMN "businessUnit" TEXT;
ALTER TABLE "Project" ADD COLUMN "category" TEXT;
ALTER TABLE "Project" ADD COLUMN "certifiedPayroll" BOOLEAN;
ALTER TABLE "Project" ADD COLUMN "city" TEXT;
ALTER TABLE "Project" ADD COLUMN "client" TEXT;
ALTER TABLE "Project" ADD COLUMN "condition" TEXT;
ALTER TABLE "Project" ADD COLUMN "description" TEXT;
ALTER TABLE "Project" ADD COLUMN "enablingWork" TEXT;
ALTER TABLE "Project" ADD COLUMN "lat" TEXT;
ALTER TABLE "Project" ADD COLUMN "leedTargeting" TEXT;
ALTER TABLE "Project" ADD COLUMN "lng" TEXT;
ALTER TABLE "Project" ADD COLUMN "ofciEquipment" BOOLEAN;
ALTER TABLE "Project" ADD COLUMN "prevailingWage" BOOLEAN;
ALTER TABLE "Project" ADD COLUMN "previewUrl" TEXT;
ALTER TABLE "Project" ADD COLUMN "primeContractor" TEXT;
ALTER TABLE "Project" ADD COLUMN "state" TEXT;
ALTER TABLE "Project" ADD COLUMN "status" TEXT;
ALTER TABLE "Project" ADD COLUMN "unionCondition" BOOLEAN;
ALTER TABLE "Project" ADD COLUMN "zip" INTEGER;

-- AlterTable
ALTER TABLE "User" ADD COLUMN "firstName" TEXT;
ALTER TABLE "User" ADD COLUMN "isActive" BOOLEAN;
ALTER TABLE "User" ADD COLUMN "isVerified" BOOLEAN;
ALTER TABLE "User" ADD COLUMN "lastLogin" DATETIME;
ALTER TABLE "User" ADD COLUMN "lastName" TEXT;
ALTER TABLE "User" ADD COLUMN "mobilePhone" TEXT;
ALTER TABLE "User" ADD COLUMN "photoUrl" TEXT;
ALTER TABLE "User" ADD COLUMN "tenantId" TEXT;
