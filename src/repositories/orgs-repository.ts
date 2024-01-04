import { Org, Prisma } from "@prisma/client";

export interface OrgsRepository {
	create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>;
	findByEmail(email: string): Promise<Org | null>;
	findByWhatsapp(whatsapp: string): Promise<Org | null>;
	findByAdressAndNumber(
		adress: string,
		adressNumber: number
	): Promise<Org | null>;
}
