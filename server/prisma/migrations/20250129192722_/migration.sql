/*
  Warnings:

  - Added the required column `alt` to the `Technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `color` to the `Technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hoverColor` to the `Technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `padding` to the `Technology` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Technology` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Technology" ADD COLUMN     "alt" TEXT NOT NULL,
ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "hoverColor" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "padding" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
