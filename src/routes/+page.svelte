<script lang="ts">
	import { invalidate, invalidateAll } from '$app/navigation';
	import ListItem from '$lib/components/ListItem.svelte';
	import Message from '$lib/components/Message.svelte';
	import { subtitle, title } from '$lib/config.js';
	import { currentSubtitle, currentTitle, webSocketClient } from '$lib/stores.js';
	import { isWebSocketMessage } from '$lib/util.js';
	import { onMount } from 'svelte';
	import { ListIcon } from 'svelte-feather-icons';

	export let data;

	$currentTitle = title;
	$currentSubtitle = subtitle;

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
					console.info(`[websocket] message ${message.type} received`);

					if (message.type === 'list-updated') {
						await invalidate(`/list/${message.uuid}/`);
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
		li {
			font-size: var(--font-size-1);
		}
	}
</style>
