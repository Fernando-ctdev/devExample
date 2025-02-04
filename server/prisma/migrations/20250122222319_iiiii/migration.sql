/*
  Warnings:

  - The primary key for the `Example` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `technologyId` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Example` table. All the data in the column will be lost.
  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Technology` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `technology` to the `Example` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topicId` to the `Example` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_technologyId_fkey";

-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_itemId_fkey";

-- DropForeignKey
ALTER TABLE "Example" DROP CONSTRAINT "Example_technologyId_fkey";

-- DropForeignKey
ALTER TABLE "Item" DROP CONSTRAINT "Item_categoryId_fkey";

-- DropIndex
DROP INDEX "Example_itemId_key";

-- AlterTable
ALTER TABLE "Example" DROP CONSTRAINT "Example_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "itemId",
DROP COLUMN "technologyId",
DROP COLUMN "updatedAt",
ADD COLUMN     "technology" TEXT NOT NULL,
ADD COLUMN     "topicId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ADD CONSTRAINT "Example_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Example_id_seq";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Item";

-- DropTable
DROP TABLE "Technology";

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "technology" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
