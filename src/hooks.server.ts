import { lucia } from '$lib/auth';
import { redirect, type Handle } from '@sveltejs/kit';

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

	return resolve(event);
};
