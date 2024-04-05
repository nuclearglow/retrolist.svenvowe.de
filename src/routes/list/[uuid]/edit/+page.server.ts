import prisma from '$lib/prisma';
import { fail, redirect, type Actions } from '@sveltejs/kit';

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
			where: { uuid: params.uuid },
			data: {
				title,
				subtitle
			}
		});

		throw redirect(303, '/');
	}
};
