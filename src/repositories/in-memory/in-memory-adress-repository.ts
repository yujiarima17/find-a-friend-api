import { Address, Prisma } from "@prisma/client";
import { AddressRepository } from "../address-repository";
import { randomUUID } from "crypto";
export class InMemoryAddressRepository implements AddressRepository {
	public items: Address[] = [];

	async create(data: Prisma.AddressUncheckedCreateInput) {
		const address = {
			id: randomUUID(),
			city: data.city,
			street: data.street,
			number: data.number,
		};
		
		this.items.push(address);

		return address;
	}

	async findById(id: string) {
		const address = this.items.find((item) => item.id === id);

		if (!address) {
			return null;
		}

		return address;
	}

	async findByNumberAndStreet(street: string, number: number) {
		const address = this.items.find((item) => {
			return item.street === street && item.number == number;
		});
		if (!address) {
			return null;
		}

		return address;
	}
}
