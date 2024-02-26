<script>
	import { page } from '$app/stores';
	import BackButton from './BackButton.svelte';

	$: listId = $page.url.pathname.match(/\/list\/(\d+)/)?.[1];
</script>

<footer>
	<div class="left">
		<BackButton />
		<!-- TODO: profile-->
		<!-- TODO: imprint-->
	</div>
	<div class="right">
		{#if listId}
			TODO: add item @see: src/components/ItemCreate.tsx
		{/if}
	</div>
</footer>

<style lang="scss">
	footer {
		grid-area: footer;
		min-height: 60px;

		&,
		.left {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}

		.left {
			min-width: 120px;
		}

		.right {
			text-align: right;
		}
	}
</style>
