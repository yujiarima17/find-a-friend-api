import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export class InMemoryOrgsRepository {
	public orgs: any[] = [];
	async create(data: Prisma.OrgUncheckedCreateInput) {
		const user = await prisma.org.create({
			data,
		});
		return user;
	}
}
