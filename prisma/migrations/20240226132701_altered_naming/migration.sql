/*
  Warnings:

  - You are about to drop the `items` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lists` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `items` DROP FOREIGN KEY `items_lists_FK`;

-- DropTable
DROP TABLE `items`;

-- DropTable
DROP TABLE `lists`;

-- CreateTable
CREATE TABLE `Item` (
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `quantity` INTEGER NULL DEFAULT 1,
    `done` BOOLEAN NOT NULL DEFAULT false,
    `list_uuid` VARCHAR(36) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `items_unique`(`uuid`),
    INDEX `items_lists_FK`(`list_uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `List` (
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `subtitle` VARCHAR(100) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `lists_unique`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `items_lists_FK` FOREIGN KEY (`list_uuid`) REFERENCES `List`(`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT;
