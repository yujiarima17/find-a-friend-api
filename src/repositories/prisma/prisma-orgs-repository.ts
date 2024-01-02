import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { OrgsRepository } from "../orgs-repository";

export class PrismaOrgsRepository implements OrgsRepository {
	async create(data: Prisma.OrgUncheckedCreateInput) {
		const user = await prisma.org.create({
			data,
		});
		return user;
	}
	async findByEmail(email: string) {
		const user = await prisma.org.findUnique({
			where: {
				email,
			},
		});

		return user;
	}
}
