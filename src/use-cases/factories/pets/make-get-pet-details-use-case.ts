import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { GetPetsDetailsUseCase } from "@/use-cases/pets/details";

export function MakeGetPetDetailsUseCase() {
	const petsRepository = new PrismaPetsRepository();
	const getPetDetailsUseCase = new GetPetsDetailsUseCase(petsRepository);

	return getPetDetailsUseCase;
}
