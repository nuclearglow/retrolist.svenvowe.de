<script>
	import { getContext } from 'svelte';

	// Retrieve list store from context
	const lists = getContext('lists');
</script>

{#each $lists as list}
	<p>{list.title} {list.subtitle}</p>
{/each}
