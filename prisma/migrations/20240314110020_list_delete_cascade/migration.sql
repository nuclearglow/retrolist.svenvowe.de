-- DropForeignKey
ALTER TABLE `Item` DROP FOREIGN KEY `items_lists_FK`;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `items_lists_FK` FOREIGN KEY (`list_uuid`) REFERENCES `List`(`uuid`) ON DELETE CASCADE ON UPDATE RESTRICT;
