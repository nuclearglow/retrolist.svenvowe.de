<script lang="ts">
	import { enhance } from '$app/forms';
	import Message from '$lib/components/Message.svelte';
	import { RETROLIST_SUBTITLE, RETROLIST_TITLE } from '$lib/config.js';
	import { currentSubtitle, currentTitle } from '$lib/stores';

	export let form;

	const handleTitleChange = (event: Event) => {
		const target = event.target as HTMLFormElement;
		$currentTitle = target?.value ?? RETROLIST_TITLE;
	};

	const handleSubtitleChange = (event: Event) => {
		const target = event.target as HTMLFormElement;
		$currentSubtitle = target?.value ?? RETROLIST_SUBTITLE;
	};
</script>

<form method="POST" action="/list/create" use:enhance>
	<fieldset>
		<legend>Create new Retrolist</legend>

		<div class="form-group">
			<label for="title">Title</label>
			<input
				required
				autocomplete="off"
				type="text"
				id="title"
				name="title"
				value={form?.title ?? ''}
				on:change={handleTitleChange}
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
				value={form?.subtitle ?? ''}
				on:change={handleSubtitleChange}
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
			<button class="btn btn-primary btn-ghost btm-small" type="submit">Create</button>
		</div>
	</fieldset>
</form>
