import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
	public items: Pet[] = [];
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
}
