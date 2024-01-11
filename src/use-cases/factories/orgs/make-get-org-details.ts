import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";

import { GetOrgDetailsUseCase } from "@/use-cases/orgs/details";

export function MakeGetOrgDetailsUseCase() {
	const orgsRepository = new PrismaOrgsRepository();
	const authenticateUseCase = new GetOrgDetailsUseCase(orgsRepository);

	return authenticateUseCase;
}
