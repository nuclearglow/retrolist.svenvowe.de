<script lang="ts">
	import { enhance } from '$app/forms';
	import Message from '$lib/components/Message.svelte';

	export let form;
</script>

<form method="POST" action="/list/create" use:enhance>
	<legend>Create new Retrolist</legend>

	{#if form?.missing}
		<Message type="error" message="Required fields missing"></Message>
	{:else if form?.incorrect}
		<Message type="error" message="Incorrect field data"></Message>
	{/if}

	<div class="form-group">
		<label for="title">Title</label>
		<input required type="text" id="title" name="title" value={form?.title ?? ''} />
	</div>
	<div class="form-group">
		<label for="subtitle">Subtitle</label>
		<input required type="text" id="subtitle" name="subtitle" value={form?.subtitle ?? ''} />
	</div>
	<button type="submit">Create</button>
</form>
