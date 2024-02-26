import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const response = await prisma.lists.findMany({
		// TODO: by user
		include: { items: true }
	});

	return { lists: response };
}) satisfies PageServerLoad;
