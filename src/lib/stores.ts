import { writable } from 'svelte/store';
import { RETROLIST_SUBTITLE, RETROLIST_TITLE } from './config';

export const currentTitle = writable(RETROLIST_TITLE);
export const currentSubtitle = writable(RETROLIST_SUBTITLE);

export const webSocketClient = writable<WebSocket | null>(null);
