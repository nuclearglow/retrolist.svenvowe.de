import type { RetroList } from '$lib/types';
import type { Item } from '@prisma/client';
import { clamp, partition } from 'lodash-es';

/**
 * Validates a UUID string.
 * @param uuid - The UUID string to validate.
 * @returns A boolean indicating whether the UUID is valid.
 */
export const validateUUID = (uuid: string): boolean =>
	!!uuid &&
	typeof uuid === 'string' &&
	uuid.length === 36 &&
	uuid.match(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/) !==
		null;

/**
 * Returns an empty item object with the default quantity of 1
 * @returns An object with the properties 'title', 'quantity', and 'done'.
 */
export const getEmptyItem = (): Pick<Item, 'title' | 'quantity' | 'done'> => ({
	title: '',
	quantity: 1,
	done: false
});

/**
 * Calculates the statistics of a RetroList.
 * @param list - The RetroList object.
 * @returns An object containing the statistics of the RetroList.
 */
export const getListStats = (list: Partial<RetroList>) => {
	const items = list?.items ?? [];
	const [itemsDone, itemsLeft] = partition(items, (item) => item.done) ?? [];
	const [done, left] = [itemsDone.length, itemsLeft.length];

	const quantityDone = itemsDone.reduce((acc, item) => acc + item.quantity, 0);
	const quantityLeft = itemsLeft.reduce((acc, item) => acc + item.quantity, 0);

	/**
	 * current progress is the percentage of total quantity of all items done
	 */
	const progress = clamp((quantityDone * 100) / items.length, 0, 100);

	return {
		done,
		left,
		quantityDone,
		quantityLeft,
		progress
	};
};

/**
 * Scrolls an element to the top or bottom.
 * @param node - The HTML element to scroll.
 * @param scrollTo - The direction to scroll to. Can be 'top' or 'bottom'.
 * @returns An object with an 'update' function that can be used to update the scroll position.
 */
export const scrollElement = (node: HTMLElement, scrollTo: 'top' | 'bottom') => {
	const scroll = () =>
		node.scroll({
			top: scrollTo === 'top' ? 0 : node.scrollHeight,
			behavior: 'smooth'
		});
	scroll();

	return { update: scroll };
};
