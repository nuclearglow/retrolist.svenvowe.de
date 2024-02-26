import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	console.log(`Seeding Database ...`);

	await Promise.all(
		[1, 2, 3].map(async (index) => {
			const list = await prisma.list.create({
				data: {
					title: `List`,
					subtitle: `${index}`,
					uuid: crypto.randomUUID(),
					items: {
						create: [1, 2, 3].map((itemIndex) => ({
							title: `Item ${itemIndex} of List ${index}`,
							quantity: itemIndex,
							uuid: crypto.randomUUID()
						}))
					}
				}
			});
			console.log(`Created list with id: ${list.id}`);
		})
	);
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
