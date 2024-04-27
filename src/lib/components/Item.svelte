<script lang="ts">
	import ItemToggleDone from '$lib/components/ItemToggleDone.svelte';
	import type { Item } from '@prisma/client';

	export let item: Item;

	let editMode = false;

	function toggleEditMode() {
		editMode = !editMode;
	}

	import ItemEdit from '$lib/components/ItemEdit.svelte';
	import { Edit2Icon } from 'svelte-feather-icons';
	import '../../styles/modules/item.scss';
</script>

<div class="item terminal-alert terminal-alert-primary" class:done={item.done}>
	{#if !editMode}
		<ItemToggleDone {item} />
		<span class="quantity">{`${item.quantity}x `}</span>
		<div class="title">{item.title}</div>

		<button
			type="button"
			class="btn btn-small btn-primary btn-ghost"
			on:click={() => (editMode = !editMode)}
		>
			<Edit2Icon size="16" />
		</button>
	{:else}
		<ItemEdit {item} listUuid={item.list_uuid} on:toggleEditMode={toggleEditMode} />
	{/if}
</div>

<style lang="scss">
	.item {
		background-color: var(--background-color-transparent);
	}
</style>
