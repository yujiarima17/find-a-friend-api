import { MakeFetchPetsByCharacteristicsUseCase } from "@/use-cases/factories/pets/make-filter-by-characteristics-use-case";
import {
	PetAgeEnum,
	PetDependencyLevelEnum,
	PetEnergyEnum,
	PetSizeEnum,
} from "@/utils/enums-pets-zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function fetch(request: FastifyRequest, reply: FastifyReply) {
	const fetchQuerySchema = z.object({
		city: z.string(),
		state: z.string().optional(),
		age: PetAgeEnum.optional(),
		size: PetSizeEnum.optional(),
		energyLevel: PetEnergyEnum.optional(),
		dependencyLevel: PetDependencyLevelEnum.optional(),
	});

	const { age, dependencyLevel, energyLevel, size,city,state } = fetchQuerySchema.parse(
		request.query
	);

	try {
		const fetchPetsByCharacteristicsUseCase =
			MakeFetchPetsByCharacteristicsUseCase();

		const { pets } = await fetchPetsByCharacteristicsUseCase.execute({
            city,
			state,
			age,
			size,
			dependencyLevel,
			energyLevel,
		});

		return reply.status(200).send({ pets });
	} catch (error) {
		throw error;
	}
}
