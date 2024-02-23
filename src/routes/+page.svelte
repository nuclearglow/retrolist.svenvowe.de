<script>
	import { getContext } from 'svelte';

	// Retrieve list store from context
	const lists = getContext('lists');
</script>

<nav>
	<ul></ul>
</nav>
{#each $lists as list (list.id)}
	<li>
		<p>{list.title} {list.subtitle}</p>
	</li>
{:else}
	TODO: register or login
{/each}

<style>
	li {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 5px 0;
	}
</style>
