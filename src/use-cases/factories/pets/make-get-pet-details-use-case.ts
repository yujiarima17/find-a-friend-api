import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetsDetailsUseCase } from "@/use-cases/pets/details";

export function MakeGetPetDetailsUseCase() {
	const petsRepository = new PrismaPetsRepository();
	const orgsRepository = new PrismaOrgsRepository();
	const getPetDetailsUseCase = new GetPetsDetailsUseCase(
		petsRepository,
		orgsRepository
	);

	return getPetDetailsUseCase;
}
