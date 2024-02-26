<script lang="ts">
	import ErrorMessage from '$lib/components/ErrorMessage.svelte';

	export let data;

	$: itemsNeeded = data.list?.items?.filter((item) => !item.done)?.length ?? 0;
</script>

<section>
	{#if data.list}
		<h3>{data.list.title} {data.list.subtitle}</h3>

		<div class="title">
			<h3>I need {itemsNeeded} more thing{itemsNeeded > 1 ? 's' : ''}:</h3>
		</div>

		<div class="items">
			{#each data.list.items as item (item.uuid)}
				<p>{item.title}</p>
				<!-- TODO: single items and edit items here-->
			{:else}
				<ErrorMessage error={'No items'}></ErrorMessage>
			{/each}
		</div>
	{:else}
		<h3>Ready to go! What do you need?</h3>
	{/if}
</section>

<style lang="scss">
	section {
		padding: 0 10px;
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
		}
	}
</style>
