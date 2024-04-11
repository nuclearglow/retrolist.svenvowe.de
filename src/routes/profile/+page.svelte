<script lang="ts">
	import { enhance } from '$app/forms';
	import Progress from '$lib/components/Progress.svelte';
	import { UserIcon } from 'svelte-feather-icons';

	export let data;
</script>

{#if data.user}
	<table>
		<tr>
			<th colspan="2">
				<caption><UserIcon size="28" /> Profile</caption>
			</th>
		</tr>

		<tbody>
			<tr>
				<td>Email</td>
				<td>{data.user?.email}</td>
			</tr>
			<tr>
				<td>Retrolists</td>
				<td>{data.stats?.totalLists}</td>
			</tr>
			<tr>
				<td>Total Items</td>
				<td>{data.stats?.totalItems}</td>
			</tr>
			<tr>
				<td>Total Quantity</td>
				<td>{data.stats?.totalQuantity}</td>
			</tr>
			<tr>
				<td>Total Progress</td>
				<td>
					<Progress progress={data.stats?.totalProgress} />
				</td>
			</tr>
			<tr>
				<td class="actions" colspan="2">
					<form action="/auth/logout" method="post" use:enhance>
						<div class="form-group">
							<button class="btn btn-primary btn-ghost btm-small" type="submit">Logout</button>
						</div>
					</form>
				</td>
			</tr>
		</tbody>
	</table>
{/if}

<style lang="css">
	.actions {
		text-align: center;
	}
</style>
