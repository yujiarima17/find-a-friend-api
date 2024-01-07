import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { GetPetsDetailsUseCase } from "@/use-cases/pets/details";
import { hash } from "bcryptjs";
import { describe, expect, it, beforeEach } from "vitest";

describe("Get Pet Details Use Case", () => {
	let petsRepository: InMemoryPetsRepository;
	let orgsRepository: InMemoryOrgsRepository;
	let sut: GetPetsDetailsUseCase;

	beforeEach(() => {
		petsRepository = new InMemoryPetsRepository();
		orgsRepository = new InMemoryOrgsRepository();
		sut = new GetPetsDetailsUseCase(petsRepository, orgsRepository);
	});

	it("should be able to get pet details", async () => {
		const org = await orgsRepository.create({
			adress: "Avenida Paulista",
			adress_number: 10,
			cep: "00000-000",
			owner: "Jimmy Arima",
			email: "pet@example.com",
			whatsapp: "55(11)999999999",
			password_hash: await hash("123456", 6),
		});

		const createdPet = await petsRepository.create({
			age: "Adulto",
			name: "Jimmy",
			size: "Grande",
			energy: "Alta",
			dependency_level: "Alto",
			environment: "Aberto",
			about_me: "Funny Dog",
			requirements: ["Food and Walk"],
			photo: "jimmyCute.png",
			org_id: org.id,
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
