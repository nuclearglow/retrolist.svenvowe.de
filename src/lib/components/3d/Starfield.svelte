<script lang="ts">
	import type { StarCoordinate } from '$lib/types';
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

	const STARS = 500;
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

	const STARIFLD_BLOOM_STRENGTH = 0.66;
	const STARIFLD_BLOOM_RADIUS = 1;
	const STARFIELD_BLOOM_THRESHOLD = 0;

	let width = 0;
	let height = 0;

	let starfieldCoordinates: StarCoordinate[] = [];

	const { scene, camera, renderer } = useThrelte();

	const composer = new EffectComposer(renderer);

	const setupEffectComposer = () => {
		composer.addPass(new RenderPass(scene, camera.current));
		composer.addPass(
			new UnrealBloomPass(
				new Vector2(width, height),
				STARIFLD_BLOOM_STRENGTH,
				STARIFLD_BLOOM_RADIUS,
				STARFIELD_BLOOM_THRESHOLD
			)
		);
		composer.addPass(new OutputPass());
	};

	useRender(() => {
		composer.render();
	});

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
		starfieldCoordinates.forEach((star, i) => {
			star.z = star.z > 1000 ? -1000 : star.z + delta * STAR_VELOCITY * i;
		});
		starfieldCoordinates = starfieldCoordinates;
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
	<T.Mesh position={[star.x, star.y, star.z]} scale={[STAR_SIZE, STAR_SIZE, STAR_SIZE]}>
		<T.SphereGeometry radius={5} widthSegments={32} heightSegments={32}></T.SphereGeometry>
		<T.MeshBasicMaterial color={STAR_COLORS[i % STAR_COLORS.length]} />
	</T.Mesh>
{/each}
