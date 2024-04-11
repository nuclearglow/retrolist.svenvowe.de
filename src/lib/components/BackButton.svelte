<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { ArrowLeftIcon } from 'svelte-feather-icons';

	function handleBack() {
		if ($page.url.pathname.startsWith('/list/')) {
			goto('/');
		} else {
			goto('/');
		}
	}
</script>

<button type="button" on:click={handleBack}>
	<ArrowLeftIcon size="32" />
</button>

<style lang="scss">
	button {
		height: 32px;
		padding: 0;
		color: var(--primary-color);
	}
</style>
