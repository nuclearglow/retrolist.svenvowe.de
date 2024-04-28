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

<div class="list">
	<div class="title">
		{#if data.list?.items?.length ?? 0 > 0}
			<h3>I need {itemsNeeded} more thing{itemsNeeded > 1 ? 's' : ''}:</h3>
		{:else}
			<h3>Ready to go! What do you need?</h3>
		{/if}
	</div>

	<div class="items">
		{#each data.list?.items ?? [] as item (item.uuid)}
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

	<div class="progress">
		{#if data.list?.items}
			<ListProgress list={data.list} />
		{/if}
	</div>
</div>

<style lang="scss">
	.list {
		padding: 0 var(--size-2);
		height: 100%;

		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: auto 1fr var(--progress-height-total);
		grid-template-areas:
			'title'
			'items'
			'progress';

		.title {
			grid-area: title;
		}

		.items {
			grid-area: items;
			overflow-y: scroll;

			display: flex;
			flex-direction: column;
			align-content: flex-start;

			&::-webkit-scrollbar {
				display: none;
			}
		}

		.progress {
			grid-area: progress;

			background-color: transparent;
			z-index: var(--z-index-foreground);
		}
	}
</style>
