import { PrismaClient } from '@prisma/client';
import { isUndefined } from 'lodash-es';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';

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

	console.log(`Creating test user ...`);
	if (isUndefined(process.env.DEMO_USER_EMAIL) || isUndefined(process.env.DEMO_USER_PASSWORD)) {
		console.error(`Populate DEMO_USER_EMAIL and DEMO_USER_PASSWORD environment variables.`);
		process.exit(1);
	}

	const { DEMO_USER_EMAIL: email, DEMO_USER_PASSWORD: password } = process.env;

	const userId = generateId(32);
	const passwordHash = await new Argon2id().hash(password);

	await prisma.user.create({
		data: {
			id: userId,
			email,
			password: passwordHash
		}
	});

	await Promise.all(
		Array.from({ length: SEED_LISTS }, (v, i) => i).map(async (v, i) => {
			const itemCount = randomBetween(SEED_ITEMS_MIN, SEED_ITEMS_MAX);

			const list = await prisma.list.create({
				data: {
					title: `List${i}`,
					subtitle: `Sub${i}`,
					userId,
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
