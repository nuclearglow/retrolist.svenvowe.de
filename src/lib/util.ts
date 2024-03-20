import type { RetroList } from '$lib/types';
import type { Item } from '@prisma/client';
import { clamp, partition } from 'lodash-es';

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

export const getListStats = (list: Partial<RetroList>) => {
	const [itemsDone, itemsLeft] = partition(list?.items, (item) => item.done) ?? [];

	const done = itemsDone.length;
	const left = itemsLeft.length;

	const quantityDone = itemsDone.reduce((acc, item) => acc + item.quantity, 0);
	const quantityLeft = itemsLeft.reduce((acc, item) => acc + item.quantity, 0);
	/**
	 * percentage of quantity of items done
	 */
	const progress = clamp((quantityDone * 100) / (quantityLeft + quantityDone), 0, 100);

	return {
		done,
		left,
		quantityDone,
		quantityLeft,
		progress
	};
};

export const scrollElement = (node: HTMLElement, scrollTo: 'top' | 'bottom') => {
	const scroll = () =>
		node.scroll({
			top: scrollTo === 'top' ? 0 : node.scrollHeight,
			behavior: 'smooth'
		});
	scroll();

	return { update: scroll };
};
