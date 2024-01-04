import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "../orgs-repository";

export class InMemoryOrgsRepository implements OrgsRepository {
	public items: Org[] = [];

	async findByEmail(email: string) {
		const org = this.items.find((item) => item.email === email);

		if (!org) {
			return null;
		}
		return org;
	}

	async findByName(name: string) {
		const org = this.items.find((item) => item.name === name);

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

	async create(data: Prisma.OrgUncheckedCreateInput) {
		const org = {
			id: "org-id",
			name: data.name,
			address_id: data.address_id,
			email: data.email,
			created_at: new Date(),
			password_hash: data.password_hash,
			whatsapp: data.whatsapp,
		};
		this.items.push(org);

		return org;
	}
}
