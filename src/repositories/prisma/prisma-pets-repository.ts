import { Prisma } from "@prisma/client";
import {
	FilterByCharacteristicsSearchProps,
	PetsRepository,
} from "../pets-repository";
import { prisma } from "@/lib/prisma";
import { PrismaOrgsRepository } from "./prisma-orgs-repository";
export class PrismaPetsRepository implements PetsRepository {
	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet = await prisma.pet.create({
			data,
		});

		return pet;
	}

	async findById(id: string) {
		const pet = await prisma.pet.findUnique({
			where: {
				id,
			},
		});
		return pet;
	}

	async fetchByCharacteristics(filter: FilterByCharacteristicsSearchProps) {
		const { city, ...optional } = filter;

		const prismaOrgsRepository = new PrismaOrgsRepository();

		const petsByCity = await prismaOrgsRepository.findByStateAndCity(
			city,
			optional.state
		);

		const pets = await prisma.pet.findMany({
			where: {
				org_id: {
					in: petsByCity,
				},
				energy: optional.energy,
				size: optional.size,
				dependency_level: optional.dependency_level,
				age: optional.age,
			},
		});
		return pets;
	}
}
