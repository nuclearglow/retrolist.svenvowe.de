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
			where: { id: Number(params.id) },
			data: {
				title,
				quantity
			}
		});

		return { success: true };
	},

	delete: async ({ params: { id } }) => {
		await prisma.item.delete({
			where: { id: Number(id) }
		});

		return { success: true };
	}
};
