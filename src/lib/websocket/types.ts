import WebSocketBase from 'ws';

/**
 * WebSocket Declarations and Types
 *
 * @see: https://github.com/suhaildawood/SvelteKit-integrated-WebSocket/issues/4
 **/
export const WebSocketSymbol = Symbol.for('sveltekit.wss');

export type ExtendedGlobal = typeof globalThis & {
	[WebSocketSymbol]: ExtendedWebSocketServer;
};

declare class ExtendedWebSocket extends WebSocketBase {
	socketId: string;
}

export type { ExtendedWebSocket };

export interface ExtendedWebSocketServer extends WebSocketBase.Server<typeof ExtendedWebSocket> {
	users: Record<string, Set<ExtendedWebSocket>>;
}

export type WebSocketMessage = {
	type: 'list-updated';
	uuid: string;
};
