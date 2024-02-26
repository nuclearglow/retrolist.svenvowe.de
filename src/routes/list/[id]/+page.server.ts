import prisma from '$lib/prisma';

export const load = async ({ params }) => {
	const list = await prisma.lists.findUnique({
		where: { id: Number(params.id) },
		include: { items: true }
	});

	return { list };
};
