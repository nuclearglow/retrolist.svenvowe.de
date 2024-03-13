import type { Item } from '@prisma/client';

export const validateUUID = (uuid: string): boolean =>
	!!uuid &&
	typeof uuid === 'string' &&
	uuid.length === 36 &&
	uuid.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/) !==
		null;

export const getEmptyItem = (): Pick<Item, 'title' | 'quantity' | 'done'> => ({
	title: '',
	quantity: 1,
	done: false
});
