import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const SEED_LISTS = 15;
const [SEED_ITEMS_MIN, SEED_ITEMS_MAX] = [5, 20];

/**
 * Generates a random number between the specified range.
 * @param start - The start of the range.
 * @param end - The end of the range.
 * @returns A random number between the start and end range (inclusive).
 */
const randomBetween = (start: number, end: number): number =>
	Math.floor(Math.random() * (end - start + 1) + start);

/**
 * Seeds the database with lists and items.
 */
async function main() {
	console.log(`Seeding Database ...`);

	await Promise.all(
		Array.from({ length: SEED_LISTS }, (v, i) => i).map(async (v, i) => {
			const itemCount = randomBetween(SEED_ITEMS_MIN, SEED_ITEMS_MAX);

			const list = await prisma.list.create({
				data: {
					title: `List`,
					subtitle: `${i}`,
					uuid: crypto.randomUUID(),
					items: {
						create: Array.from({ length: itemCount }, (v, i) => i).map((itemIndex) => ({
							title: `Item ${itemIndex} of List ${i}`,
							quantity: randomBetween(1, 5),
							uuid: crypto.randomUUID()
						}))
					}
				}
			});
			console.log(`Created list ${list.id} with ${itemCount} items`);
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
