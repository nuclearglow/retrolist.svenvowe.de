import prisma from '$lib/prisma';
import type { WebSocketMessage } from '$lib/websocket/types.js';
import { notifyWebSocketClients } from '$lib/websocket/websocket.server.js';
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
	delete: async ({ params, locals }) => {
		await prisma.list.delete({
			where: { uuid: params.uuid }
		});

		const { user, wss } = locals;

		if (wss && user?.email) {
			const message: WebSocketMessage = {
				type: 'lists-updated',
				uuid: params.uuid ?? ''
			};
			notifyWebSocketClients(wss, user.email, message);
		}

		return { success: true };
	}
};
