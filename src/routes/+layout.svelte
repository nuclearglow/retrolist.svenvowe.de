<script lang="ts">
	import 'open-props/buttons';
	import 'open-props/normalize';
	import 'open-props/style';
	// import Footer from '$lib/components/Footer.svelte';
	// import Header from '$lib/components/Header.svelte';
	import Header from '$lib/components/Header.svelte';
	import Transition from '$lib/components/Transition.svelte';

	import type { RetroList } from '$lib/types';

	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

	export let data;

	// Create a store and update it when necessary...
	const lists = writable<RetroList[]>();
	$: lists.set(data.lists);

	// ...and add it to the context for child components to access
	setContext('lists', lists);

	import '../styles/_reset.css';
	import '../styles/app.scss';
</script>

<div class="layout">
	<Header />

	<main>
		<Transition>
			<slot />
		</Transition>
	</main>

	<!-- <Footer /> -->
</div>
