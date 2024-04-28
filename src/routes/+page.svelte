<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import ListItem from '$lib/components/ListItem.svelte';
	import Message from '$lib/components/Message.svelte';
	import { RETROLIST_SUBTITLE, RETROLIST_TITLE } from '$lib/config.js';
	import { currentSubtitle, currentTitle, webSocketClient } from '$lib/stores.js';
	import { isWebSocketMessage } from '$lib/util.js';
	import { onMount } from 'svelte';
	import { ListIcon } from 'svelte-feather-icons';

	export let data;

	$currentTitle = RETROLIST_TITLE;
	$currentSubtitle = RETROLIST_SUBTITLE;

	let webSocketEstablished: boolean;

	onMount(() => {
		webSocketEstablished = false;
		establishWebSocket();
	});

	const establishWebSocket = () => {
		if (webSocketEstablished) return;

		console.log('[websocket] establishing connection');
		const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';

		$webSocketClient = new WebSocket(`${protocol}//${window.location.host}/websocket`);

		$webSocketClient.addEventListener('open', (event) => {
			webSocketEstablished = true;
			console.log('[websocket] connection open', event);
		});
		$webSocketClient.addEventListener('close', (event) => {
			webSocketEstablished = false;
			console.log('[websocket] connection closed', event);
		});
		$webSocketClient.addEventListener('message', async (event) => {
			try {
				const message = JSON.parse(`${event.data}`);

				if (isWebSocketMessage(message)) {
					console.debug(`[websocket] Message received: ${message.type}`);

					if (message.type === 'list-updated') {
						await invalidate(`/list/${message.uuid}/`);
						await invalidateAll();
					} else if (message.type === 'lists-updated') {
						await invalidate('/');
						await invalidateAll();
					}
				}
			} catch (error) {
				console.error('[websocket] error parsing message', error);
			}
		});
	};
</script>

<nav>
	<ul>
		{#each data.lists as list (list.uuid)}
			<li>
				<ListItem {list}>
					<ListIcon class="icon" size="24" />
				</ListItem>
			</li>
		{:else}
			<Message message={'You have no lists yet'}></Message>
		{/each}
	</ul>
</nav>

<style lang="scss">
	ul {
		margin-top: 0;

		li {
			font-size: var(--font-size-1);
		}
	}
</style>
