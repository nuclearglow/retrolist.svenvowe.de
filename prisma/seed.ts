import { PrismaClient } from '@prisma/client';
import { isUndefined } from 'lodash-es';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';

const prisma = new PrismaClient();

const SEED_LISTS = 15;
const [SEED_ITEMS_MIN, SEED_ITEMS_MAX] = [5, 20];

const randomBetween = (start: number, end: number): number =>
	Math.floor(Math.random() * (end - start + 1) + start);

/**
 * Creates a user with the given email and password.
 * @param email - The email of the user.
 * @param password - The password of the user.
 * @returns The ID of the created user.
 */
const createUser = async (email: string, password: string): Promise<string> => {
	const userId = generateId(32);
	const passwordBase64 = Buffer.from(password).toString('base64');
	const passwordHash = await new Argon2id().hash(passwordBase64);

	await prisma.user.create({
		data: {
			id: userId,
			email,
			password: passwordHash
		}
	});

	return userId;
};

/**
 * Seeds the database with users, lists, and items.
 */
async function main(): Promise<void> {
	console.log(`Seeding Database ...`);

	if (isUndefined(process.env.ADMIN_USER_EMAIL) || isUndefined(process.env.ADMIN_USER_PASSWORD)) {
		console.error(`Populate ADMIN_USER_EMAIL and ADMIN_USER_PASSWORD environment variables.`);
		process.exit(1);
	}
	console.log(`Creating Admin user ${process.env.ADMIN_USER_EMAIL}`);
	await createUser(process.env.ADMIN_USER_EMAIL, process.env.ADMIN_USER_PASSWORD);

	if (isUndefined(process.env.DEMO_USER_EMAIL) || isUndefined(process.env.DEMO_USER_PASSWORD)) {
		console.error(`Populate DEMO_USER_EMAIL and DEMO_USER_PASSWORD environment variables.`);
		process.exit(1);
	}
	console.log(`Creating Demo user ${process.env.DEMO_USER_EMAIL}`);
	const demoUserId = await createUser(process.env.DEMO_USER_EMAIL, process.env.DEMO_USER_PASSWORD);

	await Promise.all(
		Array.from({ length: SEED_LISTS }, (v, i) => i).map(async (v, i) => {
			const itemCount = randomBetween(SEED_ITEMS_MIN, SEED_ITEMS_MAX);

			const list = await prisma.list.create({
				data: {
					title: `List${i}`,
					subtitle: `Sub${i}`,
					userId: demoUserId,
					uuid: crypto.randomUUID(),
					items: {
						create: Array.from({ length: itemCount }, (_, i) => i).map((itemIndex) => ({
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
