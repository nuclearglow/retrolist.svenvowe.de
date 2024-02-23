-- CreateTable
CREATE TABLE `items` (
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `quantity` INTEGER NULL DEFAULT 1,
    `done` BOOLEAN NOT NULL DEFAULT false,
    `list_uuid` VARCHAR(36) NOT NULL,

    UNIQUE INDEX `items_unique`(`uuid`),
    INDEX `items_lists_FK`(`list_uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lists` (
    `id` MEDIUMINT NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(36) NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `subtitle` VARCHAR(100) NULL,

    UNIQUE INDEX `lists_unique`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `items` ADD CONSTRAINT `items_lists_FK` FOREIGN KEY (`list_uuid`) REFERENCES `lists`(`uuid`) ON DELETE RESTRICT ON UPDATE RESTRICT;
