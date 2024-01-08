import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgsAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { WhatsappAlreadyExistsError } from "@/use-cases/errors/org-whatsapp-already-exists-error";
import { RegisterUseCase } from "@/use-cases/orgs/register";
import { compare } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { AddressAlreadyExistsError } from "@/use-cases/errors/org-address-already-exists";
import { InvalidCepError } from "@/use-cases/errors/invalid-cep-error";
describe("Register Use Case", () => {
	let orgsRepository: InMemoryOrgsRepository;
	let sut: RegisterUseCase;

	beforeEach(() => {
		orgsRepository = new InMemoryOrgsRepository();
		sut = new RegisterUseCase(orgsRepository);
	});

	it("should be able to register an org", async () => {
		const { org } = await sut.execute({
			adress: "Avenida Paulista",
			adressNumber: 10,
			cep: "04130-020",
			owner: "Jimmy Arima",
			email: "pet@example.com",
			whatsapp: "55(11)999999999",
			password: "123456",
		});

		expect(org.id).toEqual(expect.any(String));
	});

	it("should not be able to register an org with wrong cep", async () => {
		expect(() =>
			sut.execute({
				adress: "Avenida Paulista",
				adressNumber: 10,
				cep: "00000-000",
				owner: "Jimmy Arima",
				email: "pet@example.com",
				whatsapp: "55(11)999999999",
				password: "123456",
			})
		).rejects.toBeInstanceOf(InvalidCepError);
	});

	it("should hash org password upon registration", async () => {
		const { org } = await sut.execute({
			adress: "Avenida Paulista",
			adressNumber: 10,
			cep: "04130-020",
			owner: "Jimmy Arima",
			email: "pet@example.com",
			whatsapp: "55(11)999999999",
			password: "123456",
		});

		const isPasswordCorrectlyHashed = await compare(
			"123456",
			org.password_hash
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it("should not be able to register an email twice", async () => {
		const email = "pet@example.com";

		await sut.execute({
			adress: "Avenida Paulista",
			adressNumber: 10,
			cep: "04130-020",
			owner: "Jimmy Arima",
			email,
			whatsapp: "55(11)999999999",
			password: "123456",
		});

		expect(() =>
			sut.execute({
				adress: "Avenida Paulista",
				adressNumber: 10,
				cep: "04130-020",
				owner: "Jimmy Arima",
				email,
				whatsapp: "55(11)999999999",
				password: "123456",
			})
		).rejects.toBeInstanceOf(OrgsAlreadyExistsError);
	});

	it("should not be able to register a whatsapp twice", async () => {
		const whatsapp = "55(11)999999999";

		await sut.execute({
			adress: "Avenida Paulista",
			adressNumber: 10,
			cep: "04130-020",
			owner: "Jimmy Arima",
			email: "pet@example.com",
			whatsapp,
			password: "123456",
		});

		expect(() =>
			sut.execute({
				adress: "Avenida Paulista",
				adressNumber: 10,
				cep: "04130-020",
				owner: "Jimmy Arima",
				email: "pet1@example.com",
				whatsapp,
				password: "123456",
			})
		).rejects.toBeInstanceOf(WhatsappAlreadyExistsError);
	});

	it("should not be able to register an address twice", async () => {
		const adress = "Avenida Paulista";
		const adressNumber = 10;

		await sut.execute({
			adress,
			adressNumber,
			cep: "04130-020",
			owner: "Jimmy Arima",
			email: "pet@example.com",
			whatsapp: "55(11)999999999",
			password: "123456",
		});

		expect(() =>
			sut.execute({
				adress,
				adressNumber,
				cep: "00000-000",
				owner: "Jimmy Arima",
				email: "pet1@example.com",
				whatsapp: "55(11)999999998",
				password: "123456",
			})
		).rejects.toBeInstanceOf(AddressAlreadyExistsError);
	});
});
