import { InMemoryOrgsRepository } from "@/repositories/in-memory/in-memory-orgs-repository";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { GetOrgDetailsUseCase } from "@/use-cases/orgs/details";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";

describe("Get Org Details", () => {
	let orgsRepository: InMemoryOrgsRepository;
	let sut: GetOrgDetailsUseCase;

	beforeEach(() => {
		orgsRepository = new InMemoryOrgsRepository();
		sut = new GetOrgDetailsUseCase(orgsRepository);
	});

	it("should be able to get org details", async () => {
		const createOrg = await orgsRepository.create({
			adress: "Avenida Paulista",
			state: "SP",
			city: "São Paulo",
			adress_number: 10,
			cep: "00000-000",
			owner: "Jimmy Arima",
			email: "pet@example.com",
			whatsapp: "55(11)999999999",
			password_hash: await hash("123456", 6),
		});
		const { org } = await sut.execute({ id: createOrg.id });

		expect(org.id).toEqual(expect.any(String));
	});

	it("should not be able to get org details with a non-existing id", async () => {
		const wrongOrgId = "wrong-id-example";

		await expect(() => sut.execute({ id: wrongOrgId })).rejects.toBeInstanceOf(
			ResourceNotFoundError
		);
	});
});
