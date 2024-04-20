import type { IncomingMessage } from 'http';
import { generateId } from 'lucia';
import type { Duplex } from 'stream';
import { parse } from 'url';
import { WebSocketServer } from 'ws';
import { WebSocketSymbol, type ExtendedGlobal, type ExtendedWebSocketServer } from './types';

export const onHttpServerUpgrade = (req: IncomingMessage, sock: Duplex, head: Buffer) => {
	const pathname = req.url ? parse(req.url).pathname : null;
	if (pathname !== '/websocket') return;

	const wss = (globalThis as ExtendedGlobal)[WebSocketSymbol];

	wss.handleUpgrade(req, sock, head, (ws) => {
		console.log('[handleUpgrade] creating new connection');
		wss.emit('connection', ws, req);
	});
};

export const createWSSGlobalInstance = () => {
	const wss = new WebSocketServer({ noServer: true }) as ExtendedWebSocketServer;
	(globalThis as ExtendedGlobal)[WebSocketSymbol] = wss;

	wss.on('connection', (ws) => {
		ws.socketId = generateId(32);

		ws.on('close', () => {
			console.log(`[wss] client disconnected (${ws.socketId})`);
		});
	});

	return wss;
};
