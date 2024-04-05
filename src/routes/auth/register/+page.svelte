<script lang="ts">
	import { enhance } from '$app/forms';
	import Message from '$lib/components/Message.svelte';

	export let form;
</script>

<form method="POST" use:enhance>
	<fieldset>
		<legend>Register</legend>

		<div class="form-group">
			<label for="email">Email</label>
			<input
				id="email"
				name="email"
				type="text"
				value={form?.email ?? ''}
				required
				autocomplete="off"
			/>
		</div>

		<div class="form-group">
			<label for="password">Password</label>
			<input
				id="password"
				name="password"
				type="password"
				value={form?.password ?? ''}
				required
				autocomplete="off"
			/>
		</div>

		<div class="form-group">
			{#if form?.error}
				<Message type="error" message={form?.error}></Message>
			{:else}
				<br />
			{/if}
		</div>

		<div class="form-group">
			<button class="btn btn-primary btn-ghost btm-small" type="submit">Register</button>
		</div>
	</fieldset>
</form>
