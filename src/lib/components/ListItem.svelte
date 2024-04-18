<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Progress from '$lib/components/Progress.svelte';
	import type { RetroList } from '$lib/types';
	import { getListStats, validateUUID } from '$lib/util';
	import { EditIcon, Trash2Icon } from 'svelte-feather-icons';

	export let list: Partial<RetroList>;

	const { progress } = getListStats(list);
	const dialogId = `deleteConfirmation-${list.uuid}`;

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

<dialog id={dialogId} popover="manual">
	<form method="POST" action="/list/{list.uuid}?/delete" on:submit|preventDefault={handleDelete}>
		<h3>Delete "{list.title}" ?</h3>

		<button popovertarget={dialogId} popovertargetaction="hide" class="btn btn-primary btn-ghost"
			>Yes!</button
		>
		<button
			type="button"
			popovertarget={dialogId}
			popovertargetaction="hide"
			class="btn btn-error btn-ghost">No!</button
		>
	</form>
</dialog>

<div class="list-item">
	<slot />

	<a class="item--content" href="/list/{list.uuid}/">
		{list.title}

		{#if list?.subtitle?.length}
			&gt; {list.subtitle}
			&gt; <Progress {progress} />
		{/if}
	</a>

	{#if list.id}
		<a class="item--edit" href="/list/{list.uuid}/edit">
			<EditIcon size="20" />
		</a>

		<button
			type="button"
			popovertarget={dialogId}
			popovertargetaction="show"
			class="btn btn-small btn-primary btn-ghost"
		>
			<Trash2Icon size="20"></Trash2Icon>
		</button>
	{/if}
</div>

<style lang="scss">
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

	.item--edit {
		padding-top: 8px;
		color: var(--quaterny-color);
	}

	.item--edit:hover {
		filter: brightness(133%);
	}
</style>
