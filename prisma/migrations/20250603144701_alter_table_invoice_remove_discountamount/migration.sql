/*
  Warnings:

  - You are about to drop the column `discountedAmount` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `originalPrice` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `subTotal` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "discountedAmount",
DROP COLUMN "originalPrice",
ADD COLUMN     "subTotal" INTEGER NOT NULL;
