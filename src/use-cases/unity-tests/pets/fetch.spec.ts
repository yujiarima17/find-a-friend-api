import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InMemoryPetsRepository } from "@/repositories/in-memory/in-memory-pets-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { FetchPetsByCharacteristicsUseCase } from "@/use-cases/pets/fetch";
import { hash } from "bcryptjs";
import { describe, it, expect, beforeEach } from "vitest";

let petsRepository: InMemoryPetsRepository;
let orgsRepository: InMemoryOrgsRepository;
let sut: FetchPetsByCharacteristicsUseCase;

describe("Fetch pets by their characteristics", () => {
	const orgId = "org-id-01";

	beforeEach(async () => {
		orgsRepository = new InMemoryOrgsRepository();
		petsRepository = new InMemoryPetsRepository(orgsRepository);
		sut = new FetchPetsByCharacteristicsUseCase(petsRepository, orgsRepository);

		orgsRepository.create({
			id: orgId,
			adress: "Avenida Paulista",
			adress_number: 10,
			cep: "04130-020",
			owner: "Jimmy Arima",
			email: "pet999@example.com",
			whatsapp: "55(11)999999998",
			password_hash: await hash("123456", 6),
			city: "São Paulo",
			state: "SP",
		});
	});

	it("should be able to fetch pets", async () => {
		await petsRepository.create({
			age: "Adulto",
			name: "Jimmy",
			size: "Grande",
			energy: "Alta",
			dependency_level: "Alto",
			environment: "Aberto",
			about_me: "Funny Dog",
			requirements: ["Food and Walk"],
			photo: "jimmyCute.png",
			org_id: orgId,
		});

		const { pets } = await sut.execute({ city: "São Paulo", state: "SP" });

		expect(pets.length == 1).toBe(true);
	});

	it("should be able to fetch pets with optional filters", async () => {
		await petsRepository.create({
			age: "Adulto",
			name: "Jimmy",
			size: "Grande",
			energy: "Alta",
			dependency_level: "Alto",
			environment: "Aberto",
			about_me: "Funny Dog",
			requirements: ["Food and Walk"],
			photo: "jimmyCute.png",
			org_id: orgId,
		});

		const { pets } = await sut.execute({
			city: "São Paulo",
			state: "SP",
			size: "Grande",
		});

		expect(pets.length == 1).toBe(true);
	});

	it("should not be able to fetch pets without inform the city", async () => {
		await petsRepository.create({
			age: "Adulto",
			name: "Jimmy",
			size: "Grande",
			energy: "Alta",
			dependency_level: "Alto",
			environment: "Aberto",
			about_me: "Funny Dog",
			requirements: ["Food and Walk"],
			photo: "jimmyCute.png",
			org_id: orgId,
		});

		await expect(() =>
			sut.execute({ city: "", state: "SP" })
		).rejects.toBeInstanceOf(ResourceNotFoundError);
	});
});
