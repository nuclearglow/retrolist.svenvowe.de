<script>
	import Message from '$lib/components/Message.svelte';
	import { PlusCircleIcon } from 'svelte-feather-icons';

	export let data;
</script>

<nav>
	<ul>
		{#each data.lists as list (list.id)}
			<li>
				<a href="/list/{list.id}/">
					<p>{list.title} {list.subtitle}</p>
				</a>
			</li>
		{:else}
			<Message message={'You have no lists yet'}></Message>
		{/each}
	</ul>

	<a href="/list/create/">
		<PlusCircleIcon class="icon" size="24" />
		<p>Create new RetroList...</p>
	</a>
</nav>

<style lang="scss">
	li {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 5px 0;
	}

	a {
		display: flex;
		justify-content: flex-start;
		align-items: center;

		p {
			padding-left: 5px;
		}
	}
</style>
