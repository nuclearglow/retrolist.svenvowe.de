import { REGEX_UUID } from '$lib/constants';
import type { RetroList } from '$lib/types';
import type { Item } from '@prisma/client';
import { clamp } from 'lodash-es';

/**
 * Validates a UUID string.
 * @param uuid - The UUID string to validate.
 * @returns A boolean indicating whether the UUID is valid.
 */
export const validateUUID = (uuid: string): boolean =>
	!!uuid && typeof uuid === 'string' && uuid.length === 36 && uuid.match(REGEX_UUID) !== null;

export const validateEmail = (email: string): boolean => {
	const re =
		// eslint-disable-next-line no-useless-escape
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(String(email).toLowerCase());
};

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
 *
 * @param list - The RetroList object.
 * @returns An object containing the statistics of the RetroList.
 */
export const getListStats = (list: Partial<RetroList>) => {
	const items = list?.items ?? [];
	const totalItems = items.length ?? 0;

	let done = 0;
	let left = 0;
	let quantityDone = 0;
	let quantityLeft = 0;

	for (const item of items) {
		if (item.done) {
			done++;
			quantityDone += item.quantity;
		} else {
			left++;
			quantityLeft += item.quantity;
		}
	}

	const totalQuantity = quantityDone + quantityLeft;

	/**
	 * current progress is the percentage of total quantity of all items done
	 */
	let progress = 0;
	if (totalQuantity > 0) {
		progress = clamp((quantityDone * 100) / totalQuantity, 0, 100);
	}

	return {
		totalItems,
		done,
		left,
		totalQuantity,
		quantityDone,
		quantityLeft,
		progress
	};
};

/**
 * Calculates the statistics of multiple RetroLists.
 *
 * @param lists - An array of RetroList objects.
 * @returns An object containing the statistics of the RetroLists.
 */
export const getTotalStats = (lists: Partial<RetroList>[]) => {
	const stats = lists.map((list) => getListStats(list));

	const totalLists = stats.length ?? 0;

	const { totalItems, done, left, totalQuantity, quantityDone, quantityLeft } = stats.reduce(
		(acc, stat) => ({
			totalItems: acc.totalItems + stat.totalItems,
			done: acc.done + stat.done,
			left: acc.left + stat.left,
			totalQuantity: acc.totalQuantity + stat.totalQuantity,
			quantityDone: acc.quantityDone + stat.quantityDone,
			quantityLeft: acc.quantityLeft + stat.quantityLeft
		}),
		{
			totalItems: 0,
			done: 0,
			left: 0,
			totalQuantity: 0,
			quantityDone: 0,
			quantityLeft: 0
		}
	);

	let totalProgress = 0;
	if (totalQuantity > 0) {
		totalProgress = clamp((quantityDone * 100) / totalQuantity, 0, 100);
	}

	return {
		totalLists,
		totalItems,
		done,
		left,
		totalQuantity,
		quantityDone,
		quantityLeft,
		totalProgress
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
