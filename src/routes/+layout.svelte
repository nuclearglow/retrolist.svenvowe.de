<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Transition from '$lib/components/Transition.svelte';
	import 'open-props/buttons';
	import 'open-props/normalize';
	import 'open-props/style';

	import type { RetroList } from '$lib/types';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	import '../styles/_reset.css';
	import '../styles/animations.css';
	import '../styles/app.css';

	export let data;

	// Create a store, update when necessary and add it to the context for child components to access
	const lists = writable<RetroList[]>();
	$: lists.set(data.lists);
	setContext('lists', lists);
</script>

<div class="layout">
	<Header />
	<main>
		<Transition>
			<slot />
		</Transition>
	</main>

	<Footer />
</div>

<style lang="scss">
	.layout {
		height: 100vh;
		/* grid container settings */
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: calc(var(--global-scale-factor) * 150px) 1fr auto;
		grid-template-areas:
			'header'
			'main'
			'footer';
	}

	main {
		grid-area: main;
		overflow-x: hidden;
		overflow-y: auto;
		margin: 20px 20px 0 20px;
	}
</style>
