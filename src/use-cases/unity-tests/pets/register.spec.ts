import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { PetsRepository } from "@/repositories/pets-repository";
import { RegisterUseCase } from "@/use-cases/pets/register";
import { it, describe, expect, beforeEach } from "vitest";

describe("Register Use Case", () => {
	let petsRepository: PetsRepository;
	let sut: RegisterUseCase;

	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository();
		sut = new RegisterUseCase(petsRepository);
	});

	it("should be able to register a pet", async () => {
		const { pet } = await sut.execute({
			age: "Adulto",
			name: "Jimmy",
			size: "Grande",
			energy: "Alta",
			dependency_level: "Alto",
			environment: "Aberto",
			about_me: "Funny Dog",
			requirements: ["Food and Walk"],
			photo: "jimmyCute.png",
			org_id: "20001345-43ef-4713-9efd-00dbcdc53ead",
		});

		expect(pet.id).toEqual(expect.any(String));
	});
});
