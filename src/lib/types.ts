import { Prisma } from '@prisma/client';

// TODO: Lucia handles this
export type User = {
	id: number;
	uuid: string;
	email: string;
	name: string;
	verified: boolean;
	password: string;
};

const listWithItems = Prisma.validator<Prisma.ListDefaultArgs>()({
	include: {
		items: true
	}
});

export type RetroList = Prisma.ListGetPayload<typeof listWithItems>;
