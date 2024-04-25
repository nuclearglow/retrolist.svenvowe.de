<script lang="ts">
	import { randomBetween } from '$lib/util';
	import { T, useTask } from '@threlte/core';

	import { onMount } from 'svelte';

	type StarCoordinate = {
		x: number;
		y: number;
		z: number;
		opacity: number;
	};

	let width = 0;
	let height = 0;
	const velocity = 3;

	let starfieldCoordinates: StarCoordinate[] = [];

	onMount(() => {
		width = window.innerWidth;
		height = window.innerHeight;

		starfieldCoordinates = Array.from({ length: 100 }, () => ({
			x: randomBetween((width / 2) * -1, width / 2),
			y: randomBetween((height / 2) * -1, height / 2),
			z: randomBetween(-1000, 1000),
			opacity: 0
		}));

		console.log(starfieldCoordinates);
	});

	useTask((delta) => {
		starfieldCoordinates = starfieldCoordinates.map((star, i) => ({
			...star,
			z: star.z > 1000 ? -1000 : star.z + delta * velocity * i
		}));
		console.log(starfieldCoordinates[0]);
	});
</script>

<T.PerspectiveCamera
	makeDefault
	fov={45}
	aspect={width / height}
	near={1}
	far={1000}
	position={[0, 0, 5]}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0);
	}}
/>

{#each starfieldCoordinates as star}
	<T.Mesh position={[star.x, star.y, star.z]} scale={[2, 2, 1]}>
		<T.SphereGeometry radius={0.5} widthSegments={32} heightSegments={32}></T.SphereGeometry>
		<T.MeshBasicMaterial color="white" transparent={true} opacity={0.33} />
	</T.Mesh>
{/each}
