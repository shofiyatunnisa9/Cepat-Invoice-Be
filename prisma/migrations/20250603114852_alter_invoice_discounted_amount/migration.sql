/*
  Warnings:

  - You are about to drop the column `amount` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `dicount` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Item` table. All the data in the column will be lost.
  - Added the required column `discount` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `discountedAmount` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalPrice` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Item` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `Item` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "amount",
DROP COLUMN "dicount",
ADD COLUMN     "discount" INTEGER NOT NULL,
ADD COLUMN     "discountedAmount" INTEGER NOT NULL,
ADD COLUMN     "originalPrice" INTEGER NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL,
ALTER COLUMN "date" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Item" DROP COLUMN "name",
ADD COLUMN     "product" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;
