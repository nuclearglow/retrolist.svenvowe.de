export async function load({ fetch }) {
	const response = await fetch('/api/lists');
	const lists = await response.json();

	return lists;
}
