<script lang="ts">
	import { enhance } from '$app/forms';
	import Message from '$lib/components/Message.svelte';
	import { error } from '@sveltejs/kit';

	export let data;
	export let form;

	const { list } = data;

	if (!list) {
		error(404, 'List not found');
	}
</script>

<form method="POST" action="/list/{list?.uuid}/edit?/update" use:enhance>
	<fieldset>
		<legend>Edit {list?.title}</legend>

		<div class="form-group">
			<label for="title">Title</label>
			<input
				required
				autocomplete="off"
				type="text"
				id="title"
				name="title"
				value={form?.title ?? list?.title ?? ''}
			/>
		</div>

		<div class="form-group">
			<label for="subtitle">Subtitle</label>
			<input
				required
				autocomplete="off"
				type="text"
				id="subtitle"
				name="subtitle"
				value={form?.subtitle ?? list?.subtitle ?? ''}
			/>
		</div>

		<div class="form-group">
			{#if form?.missing}
				<Message type="error" message="Required fields missing"></Message>
			{:else if form?.incorrect}
				<Message type="error" message="Incorrect field data"></Message>
			{:else}
				<br />
			{/if}
		</div>

		<div class="form-group">
			<button class="btn btn-primary btn-ghost" type="submit">Update</button>
		</div>
	</fieldset>
</form>
