import prisma from '$lib/prisma';

export const load = async () => {
	const response = await prisma.list.findMany({
		// TODO: by user
		include: { items: true }
	});

	return { lists: response };
};
