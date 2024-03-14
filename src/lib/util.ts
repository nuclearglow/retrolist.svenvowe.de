import type { RetroList } from '$lib/types';
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

export const getItemStats = (list: Partial<RetroList>) => {
	const done = list?.items?.filter((item) => item.done)?.length ?? 0;
	const left = list?.items?.length ?? 0 - done ?? 0;

	return {
		done,
		left
	};
};
