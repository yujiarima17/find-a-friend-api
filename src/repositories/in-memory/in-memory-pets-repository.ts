import { Pet, Prisma } from "@prisma/client";
import {
	FilterByCharacteristicsSearchProps,
	PetsRepository,
} from "../pets-repository";
import { InMemoryOrgsRepository } from "./in-memory-orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
	public items: Pet[] = [];

	constructor(private inMemoryOrgsRepository: InMemoryOrgsRepository) {}

	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet = {
			id: "pet-id",
			age: data.age,
			size: data.size,
			energy: data.energy,
			environment: data.environment,
			name: data.name,
			dependency_level: data.dependency_level,
			about_me: data.about_me,
			requirements: data.requirements as string[],
			photo: data.photo,
			created_at: new Date(),
			org_id: data.org_id,
		};

		this.items.push(pet);

		return pet;
	}

	async findById(id: string) {
		const pet = this.items.find((item) => item.id === id);

		if (!pet) {
			return null;
		}

		return pet;
	}

	async fetchByCharacteristics(filter: FilterByCharacteristicsSearchProps) {
		const { city, state, ...optional } = filter;

		type filterByCharacteritics = typeof optional;

		if (!city) {
			return null;
		}
		const orgsIdByCities = await this.inMemoryOrgsRepository.findByStateAndCity(
			city,
			state
		);

		if (!orgsIdByCities) {
			return null;
		}

		const petsByCity = this.items.filter((item) =>
			orgsIdByCities.includes(item.org_id)
		);

		const pets = petsByCity.filter((item) =>
			Object.keys(optional).every((key) => {
				const castedKey = key as keyof filterByCharacteritics;

				return (
					item.hasOwnProperty(castedKey) &&
					item[castedKey] === optional[castedKey]
				);
			})
		);

		if (pets.length == 0) {
			return null;
		}

		return pets;
	}
}
