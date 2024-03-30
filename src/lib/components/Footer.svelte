<script lang="ts">
	import { page } from '$app/stores';
	import type { RetroList } from '$lib/types';
	import { isEmpty } from 'lodash-es';
	import { PlusCircleIcon } from 'svelte-feather-icons';
	import BackButton from './BackButton.svelte';
	import ItemEdit from './ItemEdit.svelte';
	import ListItem from './ListItem.svelte';

	const newItem: Partial<RetroList> = {
		uuid: 'create',
		title: 'Create new RetroList...'
	};

	let displayMode: 'listEdit' | 'listCreate' | 'other';
	let listUuid: string;

	$: {
		listUuid =
			$page.url.pathname.match(
				/\/list\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/
			)?.[1] ?? '';

		if ($page.url.pathname === '/') {
			displayMode = 'listCreate';
		} else if ($page.url.pathname.includes('/list/') && !isEmpty(listUuid)) {
			displayMode = 'listEdit';
		} else {
			displayMode = 'other';
		}
	}
</script>

<footer>
	<div class="left">
		<BackButton />
		<!-- TODO: profile-->
		<!-- TODO: imprint-->
	</div>

	<div class="right">
		{#if displayMode === 'listCreate'}
			<a href="/list/create">
				<ListItem list={newItem}>
					<PlusCircleIcon class="icon" />
				</ListItem>
			</a>
		{:else if displayMode === 'listEdit'}
			<ItemEdit {listUuid} />
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
			display: flex;
			justify-content: right;
			width: 100%;
			text-align: right;
			white-space: nowrap;
		}
	}
</style>
