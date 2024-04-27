<script lang="ts">
	import Item from '$lib/components/Item.svelte';
	import ListProgress from '$lib/components/ListProgress.svelte';
	import Message from '$lib/components/Message.svelte';
	import {
		RETROLIST_SUBTITLE,
		RETROLIST_TITLE,
		TRANSITION_ITEM_DURATION,
		TRANSITION_ITEM_EASING_FUNCTION
	} from '$lib/config';
	import { currentSubtitle, currentTitle } from '$lib/stores';
	import { flip } from 'svelte/animate';

	export const transitions = false;

	export let data;

	let itemsNeeded = 0;
	$: {
		itemsNeeded = data.list?.items?.filter((item) => !item.done)?.length ?? 0;

		$currentTitle = data.list?.title ?? RETROLIST_TITLE;
		$currentSubtitle = data.list?.subtitle ?? RETROLIST_SUBTITLE;
	}
</script>

<section>
	{#if data.list}
		{#if data.list.items?.length > 0}
			<div class="title">
				<h3>I need {itemsNeeded} more thing{itemsNeeded > 1 ? 's' : ''}:</h3>
			</div>
		{/if}

		<div class="items">
			{#each data.list.items as item (item.uuid)}
				<div
					animate:flip={{
						duration: TRANSITION_ITEM_DURATION,
						easing: TRANSITION_ITEM_EASING_FUNCTION
					}}
					class="item-wrapper"
				>
					<Item {item} />
				</div>
			{:else}
				<Message message={'No items yet'}></Message>
			{/each}
		</div>

		<ListProgress list={data.list} />
	{:else}
		<h3>Ready to go! What do you need?</h3>
	{/if}
</section>

<style lang="scss">
	section {
		padding: 0 var(--size-2);
		height: calc(100% - var(--progress-height-total));

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
