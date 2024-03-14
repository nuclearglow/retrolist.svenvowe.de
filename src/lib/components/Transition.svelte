<script lang="ts">
	import { page } from '$app/stores';
	import { transitionDelay, transitionDuration } from '$lib/config';
	import { fade } from 'svelte/transition';

	let path: string;
	let skipTransition: boolean;

	$: {
		path = $page.url.pathname;
		skipTransition = path?.startsWith('/list/');
	}
</script>

{#if skipTransition}
	<slot />
{:else}
	<div class="transition" in:fade|local={{ delay: transitionDelay, duration: transitionDuration }}>
		<slot />
	</div>
{/if}
