import { PrismaPetsRepository } from "@/repositories/prisma/prisma-pets-repository";
import { FetchPetsByCharacteristicsUseCase } from "@/use-cases/pets/fetch";

export function MakeFetchPetsByCharacteristicsUseCase() {
	const petsRepository = new PrismaPetsRepository();
	const fetchByCharacteristicsUseCase = new FetchPetsByCharacteristicsUseCase(
		petsRepository
	);
	return fetchByCharacteristicsUseCase;
}
