import type { ExtendedWebSocketServer, WebSocketMessage } from '$lib/websocket/types';

export const notifyWebSocketClients = (
	wss: ExtendedWebSocketServer,
	email: string,
	message: WebSocketMessage
) => {
	const clients = wss.users[email] ?? [];
	const readyClients = Array.from(clients).filter((client) => client.readyState === 1);
	if (readyClients.length === 0) return;

	console.log(
		`[wss] sending ${message.type} to user: ${email} (${readyClients.length} client${readyClients.length > 0 ? 's' : ''})`
	);

	readyClients.forEach((client) => {
		client.send(JSON.stringify(message));
	});
};
