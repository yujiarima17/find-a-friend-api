import { Pet, Prisma } from "@prisma/client";
import { PetsRepository } from "../pets-repository";

export class InMemoryPetsRepository implements PetsRepository {
	public items: Pet[] = [];
	async create(data: Prisma.PetUncheckedCreateInput) {
		const pet = {
			id: "pet-id",
			age: data.age,
			color: data.color,
			characteristics: data.characteristics as string[],
			breed: data.breed,
			is_adopted: data.is_adopted,
			created_at: new Date(),
			org_id: data.org_id,
		};
		this.items.push(pet);

		return pet;
	}
}
