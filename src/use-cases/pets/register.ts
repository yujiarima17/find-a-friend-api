import { PetsRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";

interface RegisterUseCaseRequest {
	breed: string;
	color: string;
	age: number;
	characteristics: string[];
	org_id: string;
	isAdopted: boolean;
}
interface RegisterUseCaseResponse {
	pet: Pet;
}
export class RegisterUseCase {
	constructor(private petsRepository: PetsRepository) {}

	async execute(
		data: RegisterUseCaseRequest
	): Promise<RegisterUseCaseResponse> {
		const pet = await this.petsRepository.create({
			age: data.age,
			breed: data.breed,
			color: data.color,
			characteristics: data.characteristics,
			is_adopted: data.isAdopted,
			org_id: data.org_id,
		});

		return {
			pet,
		};
	}
}
