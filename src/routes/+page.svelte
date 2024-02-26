<script>
	export let data;
</script>

<nav>
	<ul></ul>
</nav>
{#each data.lists as list (list.id)}
	<li>
		<a href="/list/{list.id}/">
			<p>{list.title} {list.subtitle}</p>
		</a>
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
