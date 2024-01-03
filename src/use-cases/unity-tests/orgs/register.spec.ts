import { InMemoryAddressRepository } from "@/repositories/in-memory/in-memory-adress-repository";
import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { OrgsAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { RegisterUseCase } from "@/use-cases/orgs/register";
import { compare } from "bcryptjs";
import { expect, describe, it } from "vitest";

describe("Register Use Case", () => {
	it("should be able to register an org", async () => {
		const addressRepository = new InMemoryAddressRepository();
		const orgsRepository = new InMemoryOrgsRepository();
		const registerUseCase = new RegisterUseCase(
			orgsRepository,
			addressRepository
		);

		const { org } = await registerUseCase.execute({
			addressNumber: 10,
			city: "Sao Paulo",
			email: "pet@example.com",
			name: "Pet Org",
			password: "Pet12345",
			street: "Avenida Paulista",
			whatsapp: "55(11)999999999",
		});

		expect(org.id).toEqual(expect.any(String));
	});
	
	it("should hash org password upon registration", async () => {
		const addressRepository = new InMemoryAddressRepository();
		const orgsRepository = new InMemoryOrgsRepository();
		const registerUseCase = new RegisterUseCase(
			orgsRepository,
			addressRepository
		);

		const { org } = await registerUseCase.execute({
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
		const addressRepository = new InMemoryAddressRepository();
		const orgsRepository = new InMemoryOrgsRepository();
		const registerUseCase = new RegisterUseCase(
			orgsRepository,
			addressRepository
		);

		const email = "pet@example.com";

		await registerUseCase.execute({
			addressNumber: 10,
			city: "Sao Paulo",
			email,
			name: "Pet Org",
			password: "Pet12345",
			street: "Avenida Paulista",
			whatsapp: "55(11)999999999",
		});

		expect(() =>
			registerUseCase.execute({
				addressNumber: 10,
				city: "Sao Paulo",
				email,
				name: "Pet Org",
				password: "Pet12345",
				street: "Avenida Paulista",
				whatsapp: "55(11)999999999",
			})
		).rejects.toBeInstanceOf(OrgsAlreadyExistsError);
	});
});
