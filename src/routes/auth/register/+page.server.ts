import prisma from '$lib/prisma';
import { validateEmail } from '$lib/util';
import { fail } from '@sveltejs/kit';
import { generateId } from 'lucia';
import { Argon2id } from 'oslo/password';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		// data
		const email = data.get('email');
		const password = data.get('password');

		// validation
		if (!email || !password) {
			return fail(400, { error: 'Required fields missing', email, password });
		}

		if (typeof email !== 'string' || typeof password !== 'string') {
			return fail(400, { error: 'Required fields missing', incorrect: true });
		}

		if (!validateEmail(email)) {
			return fail(400, { error: 'Invalid email', email, password });
		}

		// check if user exists
		const user = await prisma.user.findUnique({
			where: {
				email
			}
		});

		if (user) {
			return fail(400, { exists: true });
		}

		// create new user
		const userId = generateId(32);
		const passwordHash = await new Argon2id().hash(password);

		await prisma.user.create({
			data: {
				id: userId,
				email,
				password: passwordHash
			}
		});

		return { success: 'User created' };
	}
};
