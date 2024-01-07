import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { GetPetsDetailsUseCase } from "@/use-cases/pets/details";
import { describe, expect, it, beforeEach } from "vitest";

describe("Get Pet Details Use Case", () => {
	let petsRepository: InMemoryPetsRepository;
	let sut: GetPetsDetailsUseCase;

	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository();
		sut = new GetPetsDetailsUseCase(petsRepository);
	});

	it("should be able to get pet details", async () => {
		const createdPet = await petsRepository.create({
			age: "Adulto",
			name: "Jimmy",
			size: "Grande",
			energy: "Alta",
			dependency_level: "Alto",
			environment: "Aberto",
			about_me: "Funny Dog",
			requirements: "Food and Walk",
			photo: "jimmyCute.png",
			org_id: "20001345-43ef-4713-9efd-00dbcdc53ead",
		});

		const { pet } = await sut.execute({ petId: createdPet.id });

		expect(pet.id).toEqual(expect.any(String));
	});

	it("should not be able to get pet details with wrong id", async () => {
		await expect(() =>
			sut.execute({ petId: "non-existing id" })
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
