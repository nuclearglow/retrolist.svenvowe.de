import { building } from '$app/environment';
import { lucia } from '$lib/auth';
import { WebSocketSymbol, type ExtendedGlobal } from '$lib/websocket/types';
import { redirect, type Handle } from '@sveltejs/kit';
import { isUndefined } from 'lodash-es';

// This can be extracted into a separate file
let wssInitialized = false;

const startupWebsocketServer = () => {
	if (wssInitialized) return;

	console.log('[wss] initializing...');
	const wss = (globalThis as ExtendedGlobal)[WebSocketSymbol];

	if (wss !== undefined) {
		wss.users ??= {};

		wss.on('connection', async (ws, request) => {
			// authenticate the incoming websocket request
			if (isUndefined(request.headers?.cookie)) {
				ws.close(1008, 'User not authenticated');
				return;
			}

			const sessionId = lucia.readSessionCookie(request.headers.cookie);

			if (!sessionId) {
				ws.close(1008, 'User not authenticated');
				return;
			}

			const { user } = await lucia.validateSession(sessionId);

			if (!user) {
				ws.close(1008, 'User not authenticated');
				return;
			}

			console.log(`[wss] client connected: ${user.email}`);

			// store the websocket client identified by the user email
			wss.users[user.email] ??= new Set();
			if (!wss.users[user.email].has(ws)) {
				wss.users[user.email].add(ws);
			}

			ws.on('close', () => {
				console.log(`[wss] client disconnected (${ws.socketId})`);
			});
		});

		wssInitialized = true;
	}
};

/**
 * Handles the incoming request and performs session validation.
 * @param event - The incoming request event.
 * @param resolve - The function to resolve the request.
 * @returns A promise that resolves the request with updated event locals.
 */
export const handle: Handle = async ({ event, resolve }) => {
	const sessionId = event.cookies.get(lucia.sessionCookieName);
	if (!sessionId) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await lucia.validateSession(sessionId);

	if (session && session.fresh) {
		const sessionCookie = lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});
	}

	if (!session && event.url.pathname !== '/auth/login') {
		throw redirect(302, '/auth/login');
	}

	event.locals.user = user;
	event.locals.session = session;

	startupWebsocketServer();

	// Skip WebSocket server when pre-rendering pages
	if (!building) {
		const wss = (globalThis as ExtendedGlobal)[WebSocketSymbol];
		if (wss !== undefined) {
			event.locals.wss = wss;
		}
	}

	return resolve(event);
};
