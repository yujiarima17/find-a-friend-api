import { MakeRegisterUseCase } from "@/use-cases/factories/pets/make-register-use-case";
import {
	PetAgeEnum,
	PetDependencyLevelEnum,
	PetEnergyEnum,
	PetEnvironmentEnum,
	PetSizeEnum,
} from "@/utils/enums-pets-zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerBodySchema = z.object({
		age: PetAgeEnum,
		name: z.string(),
		size: PetSizeEnum,
		energy: PetEnergyEnum,
		dependencyLevel: PetDependencyLevelEnum,
		environment: PetEnvironmentEnum,
		about_me: z.string(),
		requirements: z.string().array(),
		photo: z.string(),
	});

	const registerParamsSchema = z.object({
		orgId: z.string().uuid(),
	});
	const {
		age,
		about_me,
		dependencyLevel,
		energy,
		environment,
		name,
		photo,
		requirements,
		size,
	} = registerBodySchema.parse(request.body);

	const { orgId } = registerParamsSchema.parse(request.params);

	try {
		const registerUseCase = MakeRegisterUseCase();

		await registerUseCase.execute({
			age,
			about_me,
			dependency_level: dependencyLevel,
			energy,
			environment,
			name,
			photo,
			requirements,
			size,
			org_id: orgId,
		});
	} catch (error) {
		throw error;
	}
	return reply.status(201).send();
}
