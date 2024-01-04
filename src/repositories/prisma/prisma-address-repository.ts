import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { AddressRepository } from "../address-repository";

export class PrismaAddressRepository implements AddressRepository {
	async create(data: Prisma.AddressCreateInput) {
		const address = await prisma.address.create({
			data,
		});
		return address;
	}

	async findById(id: string) {
		const address = await prisma.address.findUnique({
			where: {
				id,
			},
		});

		return address;
	}

	async findByNumberAndStreet(street: string, number: number) {
		const address = await prisma.address.findFirst({
			where: {
				street,
				number,
			},
		});

		return address;
	}
}
