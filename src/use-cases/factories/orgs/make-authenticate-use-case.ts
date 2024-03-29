import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { AuthenticateUseCase } from "../../orgs/authenticate";

export function MakeAuthenticateUseCase() {
	const orgsRepository = new PrismaOrgsRepository();
	const authenticateUseCase = new AuthenticateUseCase(orgsRepository);

	return authenticateUseCase;
}
