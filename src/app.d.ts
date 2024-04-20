import type { ExtendedWebSocketServer } from '$lib/types';

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			// Lucia Types
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
			// WebSocket with authenticated users and their clients
			wss?: ExtendedWebSocketServer;
		}

		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
