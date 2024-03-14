<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Transition from '$lib/components/Transition.svelte';
	import 'open-props/buttons';
	import 'open-props/style';

	import '../styles/_reset.css';
	import '../styles/animations.css';
	import '../styles/app.scss';
	import '../styles/terminal.css';
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
		height: 110vh;
		/* grid container settings */
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: var(--header-height) 1fr;
		grid-template-areas:
			'header'
			'main';
	}

	main {
		max-height: calc(100vh - var(--header-height) - var(--footer-height) - var(--footer-padding));
		grid-area: main;
		overflow-x: hidden;
		overflow-y: scroll;
		margin: var(--size-4) var(--size-4) var(--footer-height) var(--size-4);
		padding-bottom: calc(var(--footer-height) + var(--footer-padding) * 2);

		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
