<script lang="ts">
	import { applyAction, deserialize } from '$app/forms';
	import { invalidate, invalidateAll } from '$app/navigation';
	import { UploadIcon } from 'svelte-feather-icons';

	import { getEmptyItem, validateUUID } from '$lib/util';
	import '../../styles/modules/item.scss';

	let item = getEmptyItem();

	export let listUuid: string;

	async function handleSubmit(event: SubmitEvent) {
		const data = new FormData(event.target as HTMLFormElement);
		data.append('quantity', item.quantity.toString());

		if (!validateUUID(listUuid)) {
			console.error('Invalid list UUID:', listUuid);
			return;
		}
		data.append('listUuid', listUuid);

		const response = await fetch(`/item/create`, {
			method: 'POST',
			body: data
		});

		const result = deserialize(await response.text());

		if (result.type === 'success') {
			// invalidate the list view and this page
			await invalidate(`/list/${listUuid}/`);
			await invalidateAll();
		}

		applyAction(result);
	}
</script>

<div class="item-create">
	<div class="amount">
		<button
			type="button"
			class="btn btn-small btn-primary btn-ghost"
			on:click={() => item.quantity++}
			>+
		</button>

		<span class={item.quantity > 1 ? 'more' : ''}>
			{item.quantity}x
		</span>

		<button
			type="button"
			class="btn btn-small btn-primary btn-ghost"
			on:click={() => item.quantity--}
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
			<UploadIcon size="16" />
		</button>
	</form>
</div>

<style lang="scss">
	.item-create {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		padding: ß var(--size-2);

		button {
			border: none;
			padding: 0 10px;
			cursor: pointer;
		}

		.amount {
			display: flex;
			justify-content: space-around;
			align-items: center;

			.more {
				color: var(--subtitle-color);
			}
		}

		input {
			max-width: 60%;
			max-height: 20px;
		}

		button[type='submit'] {
			padding: 0 20px;
			cursor: pointer;
		}
	}
</style>
