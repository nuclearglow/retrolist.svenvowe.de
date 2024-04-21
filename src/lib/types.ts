import { Prisma } from '@prisma/client';

// Prisma Client Helper Types
const listWithItems = Prisma.validator<Prisma.ListDefaultArgs>()({
	include: {
		items: true
	}
});

export type RetroList = Prisma.ListGetPayload<typeof listWithItems>;
