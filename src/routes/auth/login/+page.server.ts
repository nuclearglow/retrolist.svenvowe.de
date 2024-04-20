import { lucia } from '$lib/auth';
import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import { Argon2id } from 'oslo/password';

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();

		// data
		const email = data.get('email') as string;
		const password = data.get('password') as string;

		// validation
		if (!email || !password) {
			return fail(400, { error: 'Required fields missing', email, password });
		}

		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		if (!user) {
			// TODO: change that again
			return fail(400, { error: 'Invalid user', email, password });
		}

		const passwordBase64 = Buffer.from(password).toString('base64');
		const validPassword = await new Argon2id().verify(user.password, passwordBase64);

		if (!validPassword) {
			return fail(400, { error: 'Invalid credentials', email, password });
		}

		const session = await lucia.createSession(user.id, []);
		const sessionCookie = lucia.createSessionCookie(session.id);

		cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		throw redirect(302, '/');
	}
};
