import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgsRepository implements OrgsRepository {
	public items: Org[] = [];

	async findByEmail(email: string) {
		const org = this.items.find((item) => item.email === email);

		if (!org) {
			return null;
		}
		return org;
	}

	async findByWhatsapp(whatsapp: string) {
		const org = this.items.find((item) => item.whatsapp === whatsapp);

		if (!org) {
			return null;
		}
		return org;
	}

	async findAdressById(id: string) {
		const org = this.items.find((item) => item.id === id);
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

	async findByAdressAndNumber(adress: string, adressNumber: number) {
		const org = this.items.find(
			(item) => item.adress === adress && item.adress_number === adressNumber
		);

		if (!org) {
			return null;
		}
		return org;
	}

	async create(data: Prisma.OrgUncheckedCreateInput) {
		const org = {
			id: randomUUID(),
			adress: data.adress,
			owner: data.owner,
			adress_number: data.adress_number,
			cep: data.cep,
			email: data.email,
			city: data.cep,
			state: data.state,
			created_at: new Date(),
			password_hash: data.password_hash,
			whatsapp: data.whatsapp,
		};

		this.items.push(org);

		return org;
	}
}
