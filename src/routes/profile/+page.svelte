<script lang="ts">
	import { enhance } from '$app/forms';

	export let data;
</script>

<h3>Profile: {data.user?.email}</h3>

{#if data.user}
	<form action="/auth/logout" method="post" use:enhance>
		<div class="form-group">
			<button class="btn btn-primary btn-ghost btm-small" type="submit">Logout</button>
		</div>
	</form>
{/if}
