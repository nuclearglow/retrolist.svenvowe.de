import prisma from '$lib/prisma';
import type { Actions } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const list = await prisma.list.findUnique({
		where: { uuid: params.uuid },
		include: {
			items: {
				orderBy: [{ done: 'asc' }, { updatedAt: 'desc' }, { createdAt: 'desc' }]
			}
		}
	});

	return { list };
};

export const actions: Actions = {
	delete: async ({ params: { uuid } }) => {
		await prisma.list.delete({
			where: { uuid }
		});

		return { success: true };
	}
};
