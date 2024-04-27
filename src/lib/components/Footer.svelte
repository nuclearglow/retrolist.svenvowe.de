<script lang="ts">
	import { version } from '$app/environment';
	import { page } from '$app/stores';
	import type { RetroList } from '$lib/types';
	import { isEmpty } from 'lodash-es';
	import { PlusCircleIcon, UserIcon } from 'svelte-feather-icons';
	import BackButton from './BackButton.svelte';
	import ItemEdit from './ItemEdit.svelte';
	import ListItem from './ListItem.svelte';

	const newItem: Partial<RetroList> = {
		uuid: 'create',
		title: 'New RetroList...'
	};

	let displayMode: 'login' | 'listEdit' | 'listCreate' | 'other';
	let listUuid: string;

	$: {
		listUuid =
			$page.url.pathname.match(
				/\/list\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/
			)?.[1] ?? '';

		if ($page.url.pathname === '/') {
			displayMode = 'listCreate';
		} else if (
			$page.url.pathname.includes('/list/') &&
			!isEmpty(listUuid) &&
			!$page.url.pathname.endsWith('edit/')
		) {
			displayMode = 'listEdit';
		} else if ($page.url.pathname.includes('/auth/login')) {
			displayMode = 'login';
		} else {
			displayMode = 'other';
		}
	}
</script>

<footer>
	{#if displayMode !== 'login'}
		<div class="left">
			{#if displayMode !== 'listCreate'}
				<BackButton />
			{/if}
			<a href="/profile">
				<UserIcon size="32" />
			</a>
		</div>

		<div class="right">
			{#if displayMode === 'listCreate'}
				<a href="/list/create">
					<ListItem list={newItem}>
						<PlusCircleIcon size="32" />
					</ListItem>
				</a>
			{:else if displayMode === 'listEdit'}
				<ItemEdit {listUuid} />
			{/if}
		</div>
	{:else}
		<div class="right">
			Retrolist {version}
		</div>
	{/if}
</footer>

<style lang="scss">
	footer {
		grid-area: footer;
		width: 100%;
		height: var(--footer-height);

		padding: var(--size-1) var(--size-4) 0;

		&::before {
			content: '';
			position: absolute;
			bottom: var(--footer-height);
			box-shadow: 0 -8px 16px 8px var(--background-color-transparent);

			width: 100%;
		}

		&,
		.left {
			display: flex;
			align-items: safe center;
			justify-content: flex-start;
			gap: var(--size-2);
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
