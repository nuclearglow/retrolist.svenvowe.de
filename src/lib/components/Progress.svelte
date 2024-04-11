<script lang="ts">
	export let progress = 0;
</script>

<span class="progress" style="--progress: {progress.toFixed(0)}%">{progress.toFixed(0)}%</span>

<style lang="css">
	.progress {
		color: color-mix(
			in srgb,
			var(--progress-bar-background),
			var(--progress-bar-fill) var(--progress)
		);
	}
</style>
