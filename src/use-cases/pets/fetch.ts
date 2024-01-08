import {
	FilterByCharacteristicsSearchProps,
	PetsRepository,
} from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { OrgsRepository } from "@/repositories/orgs-repository";

interface FilterByCharacteristicsUseCaseResponse {
	pets: Pet[];
}
interface FilterByCharacteristicsUseCaseRequest
	extends FilterByCharacteristicsSearchProps {}
export class FetchPetsByCharacteristicsUseCase {
	constructor(
		private petsRepository: PetsRepository,
		private orgsRepository: OrgsRepository
	) {}
	async execute(
		data: FilterByCharacteristicsUseCaseRequest
	): Promise<FilterByCharacteristicsUseCaseResponse> {
		const pets = await this.petsRepository.fetchByCharacteristics(data);

		if (!pets) {
			throw new ResourceNotFoundError();
		}

		return { pets };
	}
}
