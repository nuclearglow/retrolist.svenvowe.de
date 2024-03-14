<script lang="ts">
	import Item from '$lib/components/Item.svelte';
	import Message from '$lib/components/Message.svelte';
	import { subtitle, title } from '$lib/config';
	import { currentSubtitle, currentTitle } from '$lib/stores';

	export const transitions = false;

	export let data;

	let itemsNeeded = 0;
	$: {
		itemsNeeded = data.list?.items?.filter((item) => !item.done)?.length ?? 0;

		$currentTitle = data.list?.title ?? title;
		$currentSubtitle = data.list?.subtitle ?? subtitle;
	}
</script>

<section>
	{#if data.list}
		<div class="title">
			<h3>I need {itemsNeeded} more thing{itemsNeeded > 1 ? 's' : ''}:</h3>
		</div>

		<div class="items">
			{#each data.list.items as item (item.uuid)}
				<Item {item} />
			{:else}
				<Message message={'No items yet'}></Message>
			{/each}
		</div>
	{:else}
		<h3>Ready to go! What do you need?</h3>
	{/if}
</section>

<style lang="scss">
	section {
		padding: 0 var(--size-2);
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: stretch;

		.title {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
		}

		.items {
			flex: 1;
			overflow-y: auto;
			display: flex;
			flex-direction: column;
			align-content: flex-start;

			&::-webkit-scrollbar {
				display: none;
			}
		}
	}
</style>
