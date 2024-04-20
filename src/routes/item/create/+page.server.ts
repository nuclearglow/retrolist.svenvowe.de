import prisma from '$lib/prisma';
import { notifyWebSocketClients } from '$lib/server/websocket.server';
import type { WebSocketMessage } from '$lib/types';
import { validateUUID } from '$lib/util';
import { fail, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, locals }) => {
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

		const { user, wss } = locals;

		if (wss && user?.email) {
			const message: WebSocketMessage = {
				type: 'list-updated',
				uuid: listUuid
			};
			notifyWebSocketClients(wss, user.email, message);
		}

		return { success: true };
	}
};
