/*
  Warnings:

  - Made the column `quantity` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Item` MODIFY `quantity` INTEGER NOT NULL DEFAULT 1;
