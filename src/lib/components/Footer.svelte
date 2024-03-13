<script>
	import { page } from '$app/stores';
	import BackButton from './BackButton.svelte';
	import ItemCreate from './ItemCreate.svelte';

	$: listUuid =
		$page.url.pathname.match(
			/\/list\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/
		)?.[1] ?? '';
</script>

<footer>
	<div class="left">
		<BackButton />
		<!-- TODO: profile-->
		<!-- TODO: imprint-->
	</div>
	<div class="right">
		{#if listUuid}
			<ItemCreate {listUuid} />
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
