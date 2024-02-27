<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { Item } from '@prisma/client';
	import { CheckSquareIcon, SquareIcon } from 'svelte-feather-icons';

	export let item: Item;

	async function handleSubmit(event: SubmitEvent) {
		const data = new FormData(event.target as HTMLFormElement);
		data.append('done', String(!item.done));

		const response = await fetch(`/item/${item.id}?/toggleDone`, {
			method: 'POST',
			body: data
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// rerun all `load` functions, following the successful update
			await invalidateAll();
		}

		applyAction(result);
	}
</script>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<button
		type="submit"
		class="btn btn-small btn-ghost"
		class:btn-success={item.done}
		class:btn-primary={!item.done}
	>
		{#if item.done}
			<CheckSquareIcon size="16" />
		{:else}
			<SquareIcon size="16" />
		{/if}
	</button>
</form>
