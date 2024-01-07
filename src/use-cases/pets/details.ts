import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";
import { OrgLocation, OrgsRepository } from "@/repositories/orgs-repository";

interface GetPetsDetailsUseCaseRequest {
	petId: string;
}

interface GetPetsDetailsUseCaseResponse {
	pet: Pet;
	location: OrgLocation;
}
export class GetPetsDetailsUseCase {
	constructor(
		private petsRepository: PetsRepository,
		private orgsRepository: OrgsRepository
	) {}
	async execute({
		petId,
	}: GetPetsDetailsUseCaseRequest): Promise<GetPetsDetailsUseCaseResponse> {
		const pet = await this.petsRepository.findById(petId);

		if (!pet) {
			throw new ResourceNotFoundError();
		}
		
		const location = await this.orgsRepository.findAdressById(pet!.org_id);

		if (!location) {
			throw new ResourceNotFoundError();
		}

		return { pet, location };
	}
}
