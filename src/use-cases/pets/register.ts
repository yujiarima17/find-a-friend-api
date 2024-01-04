import { PetsRepository } from "@/repositories/pets-repository";
import { $Enums, Pet } from "@prisma/client";

interface RegisterUseCaseRequest {
	age: $Enums.PetAge;
	name: string;
	size: $Enums.PetSize;
	energy: $Enums.EnergyLevel;
	dependency_level: $Enums.DependencyLevel;
	environment: $Enums.Environment;
	about_me: string;
	requirements: string;
	photo: string;
	org_id: string;
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
			name: data.name,
			size: data.size,
			energy: data.energy,
			dependency_level: data.dependency_level,
			environment: data.environment,
			about_me: data.about_me,
			requirements: data.requirements,
			photo: data.photo,
			org_id: data.org_id,
		});

		return {
			pet,
		};
	}
}
