import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetPetsDetailsUseCaseRequest {
	petId: string;
}

interface GetPetsDetailsUseCaseResponse {
	pet: Pet;
}
export class GetPetsDetailsUseCase {
	constructor(private petsRepository: PetsRepository) {}
	async execute({
		petId,
	}: GetPetsDetailsUseCaseRequest): Promise<GetPetsDetailsUseCaseResponse> {
		const pet = await this.petsRepository.findById(petId);

		if (!pet) {
			throw new ResourceNotFoundError();
		}
		return { pet };
	}
}
