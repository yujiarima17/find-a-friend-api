import { Address, Prisma } from "@prisma/client";

export interface AddressRepository {
	create(data: Prisma.AddressCreateInput): Promise<Address>;
	findById(id: string): Promise<Address | null>;
	findByNumberAndStreet(
		street: string,
		number: number
	): Promise<Address | null>;
}
