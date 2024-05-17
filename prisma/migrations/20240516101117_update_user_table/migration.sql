/*
  Warnings:

  - You are about to drop the column `createsAt` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `cart` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `cart` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "defaultBillingAddressId" INTEGER,
ADD COLUMN     "defaultShippingAddressId" INTEGER;

-- AlterTable
ALTER TABLE "cart" DROP COLUMN "createsAt",
DROP COLUMN "updateAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
