<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ArrowLeftIcon } from 'svelte-feather-icons';

	function handleBack() {
		if ($page.url.pathname.startsWith('/list/')) {
			goto('/lists/');
		} else {
			goto('/');
		}
	}
</script>

<button type="button" on:click={handleBack}>
	<ArrowLeftIcon />
</button>
