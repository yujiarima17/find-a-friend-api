import { Address, Prisma } from "@prisma/client";
import { AddressRepository } from "../address-repository";

export class InMemoryAddressRepository implements AddressRepository {
	public items: Address[] = [];

	async create(data: Prisma.AddressUncheckedCreateInput) {
		const address = {
			id: "address-id",
			city: data.city,
			street: data.street,
			number: data.number,
		};
		this.items.push(address);

		return address;
	}
}
