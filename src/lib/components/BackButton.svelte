<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ArrowLeftIcon } from 'svelte-feather-icons';

	// TODO: handle better returns here
	function handleBack() {
		if ($page.url.pathname.startsWith('/list/')) {
			goto('/');
		} else {
			goto('/');
		}
	}
</script>

<button type="button" class="btn btn-small btn-primary btn-ghost" on:click={handleBack}>
	<ArrowLeftIcon />
</button>
