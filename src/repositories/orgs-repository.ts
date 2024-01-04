import { Org, Prisma } from "@prisma/client";

export interface OrgsRepository {
	create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>;
	findByEmail(email: string): Promise<Org | null>;
	findByWhatsapp(whatsapp: string): Promise<Org | null>;
	findByName(name: string): Promise<Org | null>;
}
