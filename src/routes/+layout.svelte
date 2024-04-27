<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import Transition from '$lib/components/Transition.svelte';
	import 'open-props/buttons';
	import 'open-props/style';

	import Background from '$lib/3d/components/Background.svelte';
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

	<Background />
</div>

<style lang="scss">
	.layout {
		width: 100vw;
		height: 100dvh;

		/* grid container settings */
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: calc(var(--header-height) + var(--header-subtitle-height)) auto var(
				--footer-height
			);
		grid-template-areas:
			'header'
			'main'
			'footer';

		background-color: transparent;
		border: 0;
	}

	main {
		grid-area: main;

		overflow-x: hidden;
		overflow-y: scroll;
		padding: 0 var(--size-6);

		&::-webkit-scrollbar {
			display: none;
		}
	}
</style>
