<script lang="ts">
	import { page } from '$app/stores';
	import { TRANSITION_GLOBAL_DELAY, TRANSITION_GLOBAL_DURATION } from '$lib/config';
	import { REGEX_LIST_EDIT } from '$lib/constants';
	import { fade } from 'svelte/transition';

	let path: string;
	let skipTransition: boolean;

	$: {
		path = $page.url.pathname;
		skipTransition = REGEX_LIST_EDIT.test(path);
	}
</script>

{#if skipTransition}
	<slot />
{:else}
	<div
		class="transition"
		in:fade|local={{ delay: TRANSITION_GLOBAL_DELAY, duration: TRANSITION_GLOBAL_DURATION }}
	>
		<slot />
	</div>
{/if}
