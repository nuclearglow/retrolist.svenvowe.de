import { dev } from '$app/environment';

/** Metadata */
export const title = 'Retro';
export const subtitle = 'List';

/** Transition Options */
export const transitionDelay = 111;
export const transitionDuration = 666;

/** Server */
export const url = dev ? 'http://localhost:5173/' : 'https://retrolist.svenvowe.de/';
