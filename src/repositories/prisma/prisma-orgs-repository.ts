import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { OrgsRepository } from "../orgs-repository";

export class PrismaOrgsRepository implements OrgsRepository {
	async create(data: Prisma.OrgUncheckedCreateInput) {
		const org = await prisma.org.create({
			data,
		});
		return org;
	}

	async findByWhatsapp(whatsapp: string) {
		const org = await prisma.org.findUnique({
			where: {
				whatsapp,
			},
		});
		return org;
	}

	async findByEmail(email: string) {
		const org = await prisma.org.findUnique({
			where: {
				email,
			},
		});

		return org;
	}

	async findByName(name: string) {
		const org = await prisma.org.findUnique({
			where: {
				name,
			},
		});

		return org;
	}
}
