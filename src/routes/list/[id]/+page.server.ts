import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const list = await prisma.list.findUnique({
		where: { id: Number(params.id) },
		include: {
			items: {
				orderBy: [{ done: 'asc' }, { updatedAt: 'desc' }, { createdAt: 'desc' }]
			}
		}
	});

	return { list };
};

export const actions = {
	update: async ({ request, params }) => {
		const data = await request.formData();

		const title = data.get('title');
		const subtitle = data.get('subtitle');

		// validation
		if (!title || !subtitle) {
			return fail(400, { title, subtitle, missing: true });
		}

		if (typeof title !== 'string' || typeof subtitle !== 'string') {
			return fail(400, { incorrect: true });
		}

		await prisma.list.update({
			where: { id: Number(params.id) },
			data: {
				title,
				subtitle
			}
		});

		return { success: true };
	},

	delete: async ({ params: { id } }) => {
		await prisma.list.delete({
			where: { id: Number(id) }
		});

		return { success: true };
	}
};
