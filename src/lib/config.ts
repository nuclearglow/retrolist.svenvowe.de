import { dev } from '$app/environment';
import { quintOut } from 'svelte/easing';

/** Metadata */
export const RETROLIST_TITLE = 'Retro';
export const RETROLIST_SUBTITLE = 'List';

/** Transition Options */
export const TRANSITION_GLOBAL_DELAY = 111;
export const TRANSITION_GLOBAL_DURATION = 666;

/** Item Transition Options */
export const TRANSITION_ITEM_DURATION = 333;
export const TRANSITION_ITEM_EASING_FUNCTION = quintOut;

/** Server */
export const url = dev ? 'http://localhost:5173/' : 'https://retrolist.svenvowe.de/';
