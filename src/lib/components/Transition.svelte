<script lang="ts">
	import { page } from '$app/stores';
	import { transitionDelay, transitionDuration } from '$lib/config';
	import { validateUUID } from '$lib/util';
	import { fade } from 'svelte/transition';

	let path: string;
	$: path = $page.url.pathname;

	const skipTransition = path?.startsWith('/list/') && validateUUID(path?.replace(/list/, ''));
</script>

{#key path}
	{#if !skipTransition}
		<div
			class="transition"
			in:fade|local={{ delay: transitionDelay, duration: transitionDuration }}
		>
			<slot />
		</div>
	{:else}
		<slot />
	{/if}
{/key}
