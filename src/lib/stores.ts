import { writable } from 'svelte/store';
import { subtitle, title } from './config';

export const currentTitle = writable(title);
export const currentSubtitle = writable(subtitle);

export const webSocketClient = writable<WebSocket | null>(null);
