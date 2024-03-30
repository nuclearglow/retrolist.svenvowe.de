<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { RetroList } from '$lib/types';
	import { getListStats, validateUUID } from '$lib/util';
	import { EditIcon, Trash2Icon } from 'svelte-feather-icons';

	export let list: Partial<RetroList>;

	const { progress } = getListStats(list);

	async function handleDelete(event: SubmitEvent) {
		const { uuid } = list;

		if (!uuid || !validateUUID(uuid)) {
			console.error('Invalid list UUID:', list.uuid);
			return;
		}

		const data = new FormData(event.target as HTMLFormElement);
		data.append('uuid', uuid);

		const response = await fetch(`/list/${list.uuid}?/delete`, {
			method: 'POST',
			body: data
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
		}

		applyAction(result);
	}
</script>

<dialog id="deleteConfirmation" popover="manual">
	<form method="POST" action="/list/{list.uuid}?/delete" on:submit|preventDefault={handleDelete}>
		<button
			popovertarget="deleteConfirmation"
			popovertargetaction="hide"
			class="btn btn-small btn-primary btn-ghost">Confirm</button
		>
	</form>

	<button
		type="button"
		popovertarget="deleteConfirmation"
		popovertargetaction="hide"
		class="btn btn-small btn-error btn-ghost">Cancel</button
	>
</dialog>

<div class="list-item">
	<slot />

	<a class="item--content" href="/list/{list.uuid}/">
		{list.title}

		{#if list?.subtitle?.length}
			&gt; {list.subtitle}{/if}
		{#if !isNaN(progress)}
			&gt; <span class="progress" style="--progress: {progress.toFixed(0)}%"
				>{progress.toFixed(0)}%</span
			>{/if}
	</a>

	{#if list.id}
		<a class="item--edit" href="/list/{list.uuid}/edit">
			<EditIcon size="20" />
		</a>

		<button
			type="button"
			popovertarget="deleteConfirmation"
			popovertargetaction="show"
			class="btn btn-small btn-primary btn-ghost"
		>
			<Trash2Icon size="20"></Trash2Icon>
		</button>
	{/if}
</div>

<style lang="css">
	.list-item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		gap: var(--size-2);
		padding-left: 0 0 0 var(--size-3);
	}

	.item--content {
		flex-grow: 3;
	}

	.progress {
		color: color-mix(
			in srgb,
			var(--progress-bar-background),
			var(--progress-bar-fill) var(--progress)
		);
	}

	.item--edit {
		padding-top: 8 px;
		color: var(--quaterny-color);
	}

	.item--edit:hover {
		filter: brightness(133%);
	}

	button {
		box-shadow: none;
		color: var(--subtitle-color);
		outline: 0;
	}

	button:hover {
		filter: brightness(133%);
	}
</style>
