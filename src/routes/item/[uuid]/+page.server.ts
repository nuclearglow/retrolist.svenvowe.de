import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';

export const actions = {
	update: async ({ request, params }) => {
		const data = await request.formData();

		const title = data.get('title');
		const quantity = Number(data.get('quantity') ?? 1);

		// validation
		if (!title || !quantity) {
			return fail(400, { title, missing: true });
		}

		if (typeof title !== 'string') {
			return fail(400, { incorrect: true });
		}

		await prisma.item.update({
			where: { uuid: params.uuid },
			data: {
				title,
				quantity,
				updatedAt: new Date()
			}
		});

		return { success: true };
	},

	delete: async ({ params: { uuid } }) => {
		await prisma.item.delete({
			where: { uuid }
		});

		return { success: true };
	},

	toggleDone: async ({ request, params }) => {
		const data = await request.formData();

		const done = data.get('done');

		// validation
		if (done === null) {
			return fail(400, { done, missing: true });
		}
		if (typeof done !== 'string' || !['true', 'false'].includes(done)) {
			return fail(400, { incorrect: true });
		}

		await prisma.item.update({
			where: { uuid: params.uuid },
			data: {
				done: done === 'true',
				updatedAt: new Date()
			}
		});

		return { success: true };
	}
};
