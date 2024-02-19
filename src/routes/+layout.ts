export async function load({ fetch }) {
	const response = await fetch('/api/lists');

	return {
		lists: (await response.json()) ?? []
	};
}
