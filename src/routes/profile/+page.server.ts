import prisma from '$lib/prisma';
import { getTotalStats } from '../../lib/util';

export const load = async ({ locals }) => {
	const { user } = locals;

	let stats;

	if (user) {
		const lists =
			(await prisma.list.findMany({
				where: {
					userId: user.id
				},
				include: { items: true }
			})) ?? [];

		stats = getTotalStats(lists);
	}

	return { user, stats };
};
