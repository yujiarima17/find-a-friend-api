import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { AuthenticateUseCase } from "@/use-cases/orgs/authenticate";
import { hash } from "bcryptjs";
import { expect, describe, it, beforeEach } from "vitest";

describe("Authenticate Use Case", () => {
	let orgsRepository: InMemoryOrgsRepository;
	let sut: AuthenticateUseCase;

	beforeEach(() => {
		orgsRepository = new InMemoryOrgsRepository();
		sut = new AuthenticateUseCase(orgsRepository);
	});
	
	it("should be able to authenticate an org", async () => {
	

		await orgsRepository.create({
			adress: "Avenida Paulista",
			adress_number: 1,
			cep: "00000-000",
			owner: "Jimmy Arima",
			email: "pet@example.com",
			password_hash: await hash("123456", 6),
			whatsapp: "55(11)999999999",
		});

		const { org } = await sut.execute({
			email: "pet@example.com",
			password: "123456",
		});

		expect(org.id).toEqual(expect.any(String));
	});

	it("should not be able to authenticate a wrong email", async () => {


		await orgsRepository.create({
			adress: "Avenida Paulista",
			adress_number: 1,
			cep: "00000-000",
			owner: "Jimmy Arima",
			email: "pet@example.com",
			password_hash: await hash("123456", 6),
			whatsapp: "55(11)999999999",
		});

		expect(
			async () =>
				await sut.execute({
					email: "pe1t@example.com",
					password: "123456",
				})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});

	it("should not be able to authenticate a wrong password", async () => {


		await orgsRepository.create({
			adress: "Avenida Paulista",
			adress_number: 1,
			cep: "00000-000",
			owner: "Jimmy Arima",
			email: "pet@example.com",
			password_hash: await hash("123456", 6),
			whatsapp: "55(11)999999999",
		});

		expect(
			async () =>
				await sut.execute({
					email: "pet@example.com",
					password: "12345",
				})
		).rejects.toBeInstanceOf(InvalidCredentialsError);
	});
});
