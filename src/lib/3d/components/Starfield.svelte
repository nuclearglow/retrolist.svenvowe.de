<script lang="ts">
	import type { StarCoordinate } from '$lib/3d/types';
	import { randomBetween } from '$lib/util';
	import { T, useRender, useTask, useThrelte } from '@threlte/core';

	import { onMount } from 'svelte';
	import { Vector2 } from 'three';
	import {
		EffectComposer,
		OutputPass,
		RenderPass,
		UnrealBloomPass
	} from 'three/examples/jsm/Addons.js';

	const STARS = 1000;
	const STAR_SIZE = 1;
	const STAR_VELOCITY = 0.1;
	const STAR_COLORS = [
		'#e9ecef',
		'red',
		'blue',
		'green',
		'yellow',
		'purple',
		'orange',
		'pink',
		'cyan',
		'magenta',
		'lime',
		'teal',
		'indigo',
		'violet'
	];

	let width = 0;
	let height = 0;

	let starfieldCoordinates: StarCoordinate[] = [];

	const { scene, camera, renderer } = useThrelte();

	const composer = new EffectComposer(renderer);

	const setupEffectComposer = () => {
		composer.addPass(new RenderPass(scene, camera.current));
		composer.addPass(new UnrealBloomPass(new Vector2(width, height), 0.5, 1, 0));
		composer.addPass(new OutputPass());
	};

	onMount(() => {
		width = window.innerWidth;
		height = window.innerHeight;

		composer.setSize(width, height);
		setupEffectComposer();

		starfieldCoordinates = Array.from({ length: STARS }, () => ({
			x: randomBetween((width / 2) * -1, width / 2),
			y: randomBetween((height / 2) * -1, height / 2),
			z: randomBetween(-1000, 1000),
			opacity: 0
		}));
	});

	useTask((delta) => {
		starfieldCoordinates = starfieldCoordinates.map((star, i) => ({
			...star,
			z: star.z > 1000 ? -1000 : star.z + delta * STAR_VELOCITY * i
		}));
	});

	useRender(() => {
		composer.render();
	});
</script>

<T.PerspectiveCamera
	makeDefault
	position={[0, 0, 1000]}
	fov={45}
	aspect={width / height}
	on:create={({ ref }) => {
		ref.lookAt(0, 0, 0);
	}}
/>

{#each starfieldCoordinates as star, i}
	<T.Points position={[star.x, star.y, star.z]} scale={[STAR_SIZE, STAR_SIZE, STAR_SIZE]}>
		<T.SphereGeometry radius={5} widthSegments={32} heightSegments={32}></T.SphereGeometry>
		<T.MeshBasicMaterial color={STAR_COLORS[i % STAR_COLORS.length]} />
	</T.Points>
{/each}
