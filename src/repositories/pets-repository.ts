import { $Enums, Pet, Prisma } from "@prisma/client";

export interface FilterByCharacteristicsSearchProps {
	city: string;
	state?: string 
	age?: $Enums.PetAge
	energy?: $Enums.EnergyLevel
	size?: $Enums.PetSize
	dependency_level?: $Enums.DependencyLevel 
}
export interface PetsRepository {
	create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;

	findById(id: string): Promise<Pet | null>;

	fetchByCharacteristics(
		filter: FilterByCharacteristicsSearchProps
	): Promise<Pet[] | null>;
}
