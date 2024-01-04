import { InMemoryAddressRepository } from "@/repositories/in-memory/in-memory-adress-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { NameAlreadyExistsError } from "@/use-cases/errors/org-name-already-exists-error";
import { OrgsAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { WhatsappAlreadyExistsError } from "@/use-cases/errors/org-whatsapp-already-exists-error";
import { RegisterUseCase } from "@/use-cases/orgs/register";
import { compare } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";
import { AddressAlreadyExistsError } from "@/use-cases/errors/org-address-already-exists";

describe("Register Use Case", () => {
	let orgsRepository: InMemoryOrgsRepository;
	let addressRepository: InMemoryAddressRepository;
	let sut: RegisterUseCase;

	beforeEach(() => {
		orgsRepository = new InMemoryOrgsRepository();
		addressRepository = new InMemoryAddressRepository();
		sut = new RegisterUseCase(orgsRepository, addressRepository);
	});

	it("should be able to register an org", async () => {
		const { org } = await sut.execute({
			addressNumber: 10,
			city: "Sao Paulo",
			email: "pet@example.com",
			name: "Pet Org",
			password: "Pet12345",
			street: "Avenida Paulista ",
			whatsapp: "55(11)999999999",
		});

		expect(org.id).toEqual(expect.any(String));
	});

	it("should hash org password upon registration", async () => {
		const { org } = await sut.execute({
			addressNumber: 10,
			city: "Sao Paulo",
			email: "pet@example.com",
			name: "Pet Org",
			password: "Pet12345",
			street: "Avenida Paulista",
			whatsapp: "55(11)999999999",
		});

		const isPasswordCorrectlyHashed = await compare(
			"Pet12345",
			org.password_hash
		);

		expect(isPasswordCorrectlyHashed).toBe(true);
	});

	it("should not be able to register an email twice", async () => {
		const email = "pet@example.com";

		await sut.execute({
			addressNumber: 10,
			city: "Sao Paulo",
			email,
			name: "Pet Org",
			password: "Pet12345",
			street: "Avenida Paulista",
			whatsapp: "55(11)999999999",
		});

		expect(() =>
			sut.execute({
				addressNumber: 11,
				city: "Sao Paulo",
				email,
				name: "Pet Org",
				password: "Pet12345",
				street: "Avenida Paulista 1",
				whatsapp: "55(11)999999999",
			})
		).rejects.toBeInstanceOf(OrgsAlreadyExistsError);
	});

	it("should not be able to register a whatsapp twice", async () => {
		const whatsapp = "55(11)999999999";

		await sut.execute({
			addressNumber: 10,
			city: "Sao Paulo",
			email: "pet@example.com",
			name: "Pet Org",
			password: "Pet12345",
			street: "Avenida Paulista",
			whatsapp: whatsapp,
		});

		expect(() =>
			sut.execute({
				addressNumber: 11,
				city: "Sao Paulo",
				email: "pet1@example.com",
				name: "Pet Org",
				password: "Pet12345",
				street: "Avenida Paulista 1",
				whatsapp: whatsapp,
			})
		).rejects.toBeInstanceOf(WhatsappAlreadyExistsError);
	});

	it("should not be able to register a name twice", async () => {
		const name = "Jimmy Org";

		await sut.execute({
			addressNumber: 10,
			city: "Sao Paulo",
			email: "pet@example.com",
			name,
			password: "Pet12345",
			street: "Avenida Paulista",
			whatsapp: "55(11)999999999",
		});

		expect(() =>
			sut.execute({
				addressNumber: 11,
				city: "Sao Paulo",
				email: "pet1@example.com",
				name,
				password: "Pet12345",
				street: "Avenida Paulista 1",
				whatsapp: "55(11)999999998",
			})
		).rejects.toBeInstanceOf(NameAlreadyExistsError);
	});

	it("should not be able to register an address twice", async () => {
		const street = "Avenida Paulista";
		const addressNumber = 10;

		await sut.execute({
			addressNumber,
			city: "Sao Paulo",
			email: "pet@example.com",
			name: "Jimmy Org 1",
			password: "Pet12345",
			street,
			whatsapp: "55(11)999999999",
		});

		expect(() =>
			sut.execute({
				addressNumber,
				city: "Sao Paulo",
				email: "pet1@example.com",
				name: "Jimmy Org 2",
				password: "Pet12345",
				street,
				whatsapp: "55(11)999999998",
			})
		).rejects.toBeInstanceOf(AddressAlreadyExistsError);
	});
});
