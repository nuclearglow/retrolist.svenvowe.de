<script lang="ts">
	export let message: string;
	export let type: 'error' | 'warning' | 'info' | 'success' = 'info';
</script>

<div
	class="terminal-alert"
	class:terminal-alert-error={type === 'error'}
	class:terminal-alert-primary={type === 'info'}
	class:terminal-alert-success={type === 'success'}
>
	{message}
</div>
