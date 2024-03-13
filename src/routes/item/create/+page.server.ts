import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';
import { validateUUID } from '$lib/util';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		// data
		const listUuid = data.get('listUuid');
		const title = data.get('title');
		const quantity = Number(data.get('quantity') ?? 1);

		// validation
		if (!listUuid || !title) {
			return fail(400, { listUuid, title, missing: true });
		}

		if (typeof title !== 'string' || typeof listUuid !== 'string') {
			return fail(400, { incorrect: true });
		}
		if (!validateUUID(listUuid)) {
			return fail(400, { incorrect: true });
		}

		await prisma.item.create({
			data: {
				uuid: crypto.randomUUID(),
				title,
				quantity,
				list_uuid: listUuid
			}
		});

		return { success: true };
	}
};
