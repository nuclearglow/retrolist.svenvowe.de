<script lang="ts">
	import { page } from '$app/stores';
	import { transitionDelay, transitionDuration } from '$lib/config';
	import { fade } from 'svelte/transition';

	let path: string;
	$: path = $page.url.pathname;
</script>

{#key path}
	<div class="transition" in:fade={{ delay: transitionDelay, duration: transitionDuration }}>
		<slot />
	</div>
{/key}
