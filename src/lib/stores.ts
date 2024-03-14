import { writable } from 'svelte/store';
import { title, subtitle } from './config';

export const currentTitle = writable(title);
export const currentSubtitle = writable(subtitle);
