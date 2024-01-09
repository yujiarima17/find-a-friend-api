import {
	FilterByCharacteristicsSearchProps,
	PetsRepository,
} from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { InvalidCityInputError } from "../errors/invalid-city-input-error";

interface FilterByCharacteristicsUseCaseResponse {
	pets: Pet[];
}
interface FilterByCharacteristicsUseCaseRequest
	extends FilterByCharacteristicsSearchProps {}
export class FetchPetsByCharacteristicsUseCase {
	constructor(
		private petsRepository: PetsRepository,
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
