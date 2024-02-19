// TODO: Lucia handles this
export type User = {
	id: number;
	uuid: string;
	email: string;
	name: string;
	verified: boolean;
	password: string;
};

export type RetroList = {
	id?: number;
	uuid: string;
	title: string;
	subtitle: string;
	items: ListItem[];
};

export type ListItem = {
	id?: number;
	uuid: string;
	title: string;
	quantity: number;
	done: boolean;
};
