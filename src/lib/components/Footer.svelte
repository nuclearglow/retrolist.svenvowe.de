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
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: var(--footer-height);
		padding: 0 var(--size-4);

		background-color: var(--background-color);

		&::before {
			content: '';
			position: absolute;
			bottom: var(--footer-height);
			box-shadow: 0 16px 32px 16px var(--background-color);
			clip-path: inset(-32px -32px -8px 0);
			width: 100%;
		}
		z-index: 1000;

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
			flex-grow: 3;
			text-align: right;
		}
	}
</style>
