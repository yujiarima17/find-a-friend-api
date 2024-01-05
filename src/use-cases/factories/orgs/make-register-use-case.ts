import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterUseCase } from "../../orgs/register";

export function MakeRegisterUseCase() {
	const orgsRepository = new PrismaOrgsRepository();
	const registerUseCase = new RegisterUseCase(
		orgsRepository,
	);

	return registerUseCase;
}
