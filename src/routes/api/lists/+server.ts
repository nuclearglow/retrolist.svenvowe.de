import type { RetroList } from '$lib/types';
import { json } from '@sveltejs/kit';

const lists: RetroList[] = [
	{
		uuid: '61141143e6a2fb44928b51b7',
		title: 'Retrolist',
		subtitle: 'dev',
		items: [
			{
				uuid: '6114114fe6a2fb44928b51cf',
				title: 'update lists ',
				quantity: 1,
				done: false
			},
			{
				uuid: '61141157e6a2fb44928b51d6',
				title: 'better cache normalisation ',
				quantity: 1,
				done: false
			},
			{
				uuid: '61141174e6a2fb44928b51de',
				title: 'PDF download ',
				quantity: 1,
				done: false
			},
			{
				uuid: '61141185e6a2fb44928b51f9',
				title: 'reverse item flow ',
				quantity: 1,
				done: false
			},
			{
				uuid: '6114118de6a2fb44928b5203',
				title: 'inject Version ',
				quantity: 1,
				done: false
			},
			{
				uuid: '611411e6e6a2fb44928b5223',
				title: 'drag and drop items ',
				quantity: 1,
				done: false
			},
			{
				uuid: '61141225e6a2fb44928b5247',
				title: '100% done delete list button',
				quantity: 1,
				done: false
			},
			{
				uuid: '61141274e6a2fb44928b5256',
				title: 'New list jump in ',
				quantity: 1,
				done: false
			},
			{
				uuid: '6114129ee6a2fb44928b526a',
				title: 'animations ',
				quantity: 1,
				done: false
			},
			{
				uuid: '611412efe6a2fb44928b5281',
				title: 'caching on server ',
				quantity: 1,
				done: false
			},
			{
				uuid: '61a541087c28ae0c2e69ce3a',
				title: 'list view',
				quantity: 1,
				done: false
			},
			{
				uuid: '61c6f8607c28ae0c2e6a0247',
				title: 'sublists ',
				quantity: 1,
				done: false
			},
			{
				uuid: '61c6f86b7c28ae0c2e6a0259',
				title: 'button clear list ',
				quantity: 1,
				done: false
			}
		]
	},
	{
		uuid: '61179af0e6a2fb44928b580a',
		title: 'Video',
		subtitle: '2x',
		items: [
			{
				uuid: '61179af9e6a2fb44928b5824',
				title: 'Es war einmal das Leben ',
				quantity: 1,
				done: false
			},
			{
				uuid: '61179b00e6a2fb44928b582b',
				title: 'odyssey 31 13',
				quantity: 1,
				done: false
			},
			{
				uuid: '61179b07e6a2fb44928b5833',
				title: 'goldene Städte ',
				quantity: 1,
				done: false
			}
		]
	}
];

async function getLists() {
	return json(lists);
}

// TODO: use database connection to assemble everything here
export async function GET() {
	return await getLists();
}
