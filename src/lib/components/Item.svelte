<script lang="ts">
	import ItemToggleDone from '$lib/components/ItemToggleDone.svelte';
	import type { Item } from '@prisma/client';

	export let item: Item;

	let editMode = false;

	import '../../styles/item.scss';
</script>

<div class="item terminal-alert terminal-alert-primary" class:done={item.done}>
	{#if !editMode}
		<ItemToggleDone {item} />
	{/if}
	<div class="quantity">
		<span class="quantity">{`${item.quantity}x `}</span>
		<div>{item.title}</div>
	</div>
	<!-- TODO: Switch to Edit -->
</div>
