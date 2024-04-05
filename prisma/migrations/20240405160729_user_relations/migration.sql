/*
  Warnings:

  - Added the required column `userId` to the `List` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `List` ADD COLUMN `userId` VARCHAR(100) NOT NULL;

-- AlterTable
ALTER TABLE `Session` MODIFY `expiresAt` DATETIME(3) NOT NULL DEFAULT DATE_ADD(NOW(), INTERVAL 30 DAY);

-- AddForeignKey
ALTER TABLE `List` ADD CONSTRAINT `List_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
