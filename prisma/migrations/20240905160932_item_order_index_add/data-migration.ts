import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Migrate the data to add orderIndex to the item table. Ordering is initially done by using the updatedAt field.
 */
async function main() {
  await prisma.$transaction(async (tx) => {
    const items = await tx.item.findMany({
      orderBy: [{ updatedAt: 'desc' }]
    });

    for (const [index, item] of items.entries()) {
      await tx.item.update({
        where: { id: item.id },
        data: {
          orderIndex: index
        }
      });
    }
  });
}

main()
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
