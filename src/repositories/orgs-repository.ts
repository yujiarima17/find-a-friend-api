import { Org, Prisma } from "@prisma/client";

export interface OrgLocation {
	cep: string;
	adress: string;
	adressNumber: number;
}
export interface OrgsRepository {
	create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>;

	findByEmail(email: string): Promise<Org | null>;

	findAdressById(id: string): Promise<OrgLocation | null>;

	findByWhatsapp(whatsapp: string): Promise<Org | null>;

	findByAdressAndNumber(
		adress: string,
		adressNumber: number
	): Promise<Org | null>;

	findByStateAndCity(state: string, city: string): Promise<string[] | null>;
}
