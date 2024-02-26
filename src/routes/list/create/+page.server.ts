import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		// data
		const title = data.get('title');
		const subtitle = data.get('subtitle');

		// validation
		if (!title || !subtitle) {
			return fail(400, { title, subtitle, missing: true });
		}

		if (typeof title !== 'string' || typeof subtitle !== 'string') {
			return fail(400, { incorrect: true });
		}

		const uuid = crypto.randomUUID();

		await prisma.list.create({
			data: {
				uuid,
				title,
				subtitle
			}
		});

		throw redirect(303, '/');
	}
};
