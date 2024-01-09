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
	async findAdressById(id: string) {
		const org = await prisma.org.findUnique({
			where: {
				id,
			},
		});

		if (!org) {
			return null;
		}

		const orgLocation = {
			adress: org.adress,
			adressNumber: org.adress_number,
			cep: org.cep,
		};

		return orgLocation;
	}
	async findById(id: string) {
		const org = await prisma.org.findUnique({
			where: { id },
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

	async findByAdressAndNumber(adress: string, adressNumber: number) {
		const org = await prisma.org.findFirst({
			where: {
				adress,
				adress_number: adressNumber,
			},
		});

		return org;
	}
	async findByStateAndCity(city: string, state?: string) {
		const orgs = await prisma.org.findMany({
			where: {
				state,
				city,
			},
		});

		const orgsId = orgs.map((org) => org.id);

		return orgsId;
	}
}
