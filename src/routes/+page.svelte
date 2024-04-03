<script lang="ts">
	import ListItem from '$lib/components/ListItem.svelte';
	import Message from '$lib/components/Message.svelte';
	import { subtitle, title } from '$lib/config.js';
	import { currentSubtitle, currentTitle } from '$lib/stores.js';
	import { ListIcon } from 'svelte-feather-icons';

	export let data;

	$currentTitle = title;
	$currentSubtitle = subtitle;
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
