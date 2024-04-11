<script lang="ts">
	import type { RetroList } from '$lib/types';
	import { getListStats } from '$lib/util';

	export let list: RetroList;

	$: progress = getListStats(list)?.progress ?? 0;
</script>

<div class="progress">
	<div class="progress-bar progress-bar-show-percent">
		<div
			class="progress-bar-filled"
			style={`width: ${progress.toFixed(0)}%`}
			data-filled={`${progress.toFixed(0)}%`}
		></div>
	</div>
</div>

<style lang="scss">
	.progress {
		position: fixed;
		height: var(--progress-height-total);
		left: var(--size-6);
		right: var(--size-6);
		bottom: var(--footer-height);
		background-color: var(--background-color);
		z-index: 1000;
	}

	.progress-bar {
		height: var(--progress-height);
		background-color: var(--progress-bar-background);
	}

	.progress-bar.progress-bar-show-percent {
		margin-top: var(--progress-margin);
	}

	.progress-bar-filled {
		position: relative;

		background-color: var(--progress-bar-fill);
		height: 100%;
		transition: width 0.3s ease;
		width: 0;
	}

	.progress-bar-filled::before {
		content: '';
		position: absolute;
		top: -12px;
		right: -6px;

		border: 6px solid transparent;
		border-top-color: var(--progress-bar-fill);
	}

	.progress-bar-filled::after {
		display: block;
		content: attr(data-filled);

		position: absolute;
		top: calc(-1 * var(--progress-margin));
		right: 0px;

		color: var(--progress-bar-fill);
		font-size: var(--font-size-0);
		white-space: nowrap;

		border: 6px solid transparent;

		transform: translateX(50%);
		transform: translateX(50%);
	}
</style>
