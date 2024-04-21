import prisma from '$lib/prisma';
import type { WebSocketMessage } from '$lib/websocket/types.js';
import { notifyWebSocketClients } from '$lib/websocket/websocket.server.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	update: async ({ request, params, locals }) => {
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

		const { user, wss } = locals;

		if (wss && user?.email) {
			const message: WebSocketMessage = {
				type: 'list-updated',
				uuid: params.uuid
			};
			notifyWebSocketClients(wss, user.email, message);
		}

		return { success: true };
	},

	delete: async ({ params, locals }) => {
		await prisma.item.delete({
			where: { uuid: params.uuid }
		});

		const { user, wss } = locals;

		if (wss && user?.email) {
			const message: WebSocketMessage = {
				type: 'list-updated',
				uuid: params.uuid
			};
			notifyWebSocketClients(wss, user.email, message);
		}

		return { success: true };
	},

	toggleDone: async ({ request, params, locals }) => {
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

		const { user, wss } = locals;

		if (wss && user?.email) {
			const message: WebSocketMessage = {
				type: 'list-updated',
				uuid: params.uuid
			};
			notifyWebSocketClients(wss, user.email, message);
		}

		return { success: true };
	}
};
