<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { SaveIcon, Trash2Icon, UploadIcon } from 'svelte-feather-icons';

	import { getEmptyItem, validateUUID } from '$lib/util';
	import type { Item } from '@prisma/client';
	import { isUndefined } from 'lodash-es';
	import '../../styles/modules/item.scss';

	import { redirect } from '@sveltejs/kit';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// invokes parent component's toggleEditMode function
	function toggleEditMode() {
		dispatch('toggleEditMode');
	}

	export let item: Partial<Item> = getEmptyItem();
	export let listUuid: string;

	let createMode: boolean;
	let action: string;

	$: {
		createMode = isUndefined(item.uuid);
		action = createMode ? '/item/create' : `/item/${item.uuid}?/update`;
	}

	async function handleDelete(event: SubmitEvent) {
		const { uuid } = item;

		if (!uuid || !validateUUID(uuid)) {
			console.error('Invalid item UUID:', item.uuid);
			return;
		}

		const data = new FormData(event.target as HTMLFormElement);
		data.append('uuid', uuid);

		const response = await fetch(`/item/${item.uuid}?/delete`, {
			method: 'POST',
			body: data
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidate(`/list/${listUuid}/`);
			await invalidateAll();
			redirect(303, `/list/${listUuid}/`);
		}

		applyAction(result);
	}

	async function handleSubmit(event: SubmitEvent) {
		const target = event.target as HTMLFormElement;

		const data = new FormData(target);
		data.append('quantity', item?.quantity?.toString() ?? '1');

		if (!validateUUID(listUuid)) {
			console.error('Invalid list UUID:', listUuid);
			return;
		}
		data.append('listUuid', listUuid);

		const response = await fetch(action, {
			method: 'POST',
			body: data
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// invalidate the list view, this page and reset the form
			await invalidate(`/list/${listUuid}/`);
			await invalidateAll();
			target?.reset?.();
			// toggle edit mode from parent component
			if (!createMode) {
				toggleEditMode();
			}
		} else {
			applyAction(result);
		}
	}
</script>

<dialog id="deleteConfirmation" popover="manual">
	<form method="POST" action="/item/{item.uuid}?/delete" on:submit|preventDefault={handleDelete}>
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

<div class="item-edit">
	{#if !createMode}
		<button
			type="button"
			popovertarget="deleteConfirmation"
			popovertargetaction="show"
			class="btn btn-small btn-primary btn-ghost"
		>
			<Trash2Icon size="20"></Trash2Icon>
		</button>
	{/if}

	<div class="amount">
		<button
			type="button"
			class="btn btn-small btn-primary btn-ghost"
			on:click={() => (item.quantity = (item.quantity ?? 1) + 1)}
			>+
		</button>

		<span class={Number(item?.quantity) > 1 ? 'more' : ''}>
			{item.quantity}x
		</span>

		<button
			type="button"
			class="btn btn-small btn-primary btn-ghost"
			on:click={() => (item.quantity = Math.max(1, (item.quantity ?? 1) - 1))}
			>-
		</button>
	</div>

	<form method="POST" on:submit|preventDefault={handleSubmit}>
		<input
			id="title"
			name="title"
			type="text"
			minLength={1}
			required
			placeholder="I need..."
			autoComplete="off"
			value={item.title}
		/>

		<button type="submit" class="btn btn-small btn-primary btn-ghost">
			{#if createMode}
				<UploadIcon />
			{:else}
				<SaveIcon />
			{/if}
		</button>
	</form>
</div>

<style lang="scss">
	.item-edit {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		button[type='button'] {
			cursor: pointer;
			color: var(--error-color);
		}

		.amount {
			display: flex;
			justify-content: space-around;
			align-items: center;

			.more {
				color: var(--subtitle-color);
			}
		}

		form {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			gap: var(--size-2);

			input {
				padding: var(--size-1);
				text-indent: var(--size-2);
			}

			button[type='submit'] {
				cursor: pointer;
			}
		}
	}
</style>
