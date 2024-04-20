import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const { user } = locals;

	if (!user?.id) {
		throw redirect(302, '/auth/login');
	}

	const response = await prisma.list.findMany({
		where: {
			userId: user.id
		},
		include: { items: true }
	});

	return { lists: response };
};
