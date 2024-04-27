<script lang="ts">
	import Starfield from '$lib/3d/components/Starfield.svelte';
	import { Canvas } from '@threlte/core';
</script>

<div class="background">
	<Canvas>
		<Starfield />
	</Canvas>
</div>

<style lang="scss">
	.background {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;

		width: 100vw;
		height: 100dvh;

		filter: brightness(var(--background-brightness));
		z-index: var(--z-index-background);
	}
</style>
