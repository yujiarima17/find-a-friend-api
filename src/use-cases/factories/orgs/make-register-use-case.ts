import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { RegisterUseCase } from "../../orgs/register";

export function MakeRegisterUseCase() {
	const orgsRepository = new PrismaOrgsRepository();
	const addressRepository = new PrismaAddressRepository();
	const registerUseCase = new RegisterUseCase(
		orgsRepository,
		addressRepository
	);

	return registerUseCase;
}
