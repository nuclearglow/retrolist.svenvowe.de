import prisma from '$lib/prisma';
import { json } from '@sveltejs/kit';

export async function GET() {
	const lists = await prisma.lists.findMany({
		include: {
			items: true
		}
	});

	return json({ lists });
}
