import { MakeGetPetDetailsUseCase } from "@/use-cases/factories/pets/make-get-pet-details-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
export async function details(request: FastifyRequest, reply: FastifyReply) {
	const detailsParamsSchema = z.object({
		petId: z.string().uuid(),
	});

	const { petId } = detailsParamsSchema.parse(request.params);

	const detailsUseCase = MakeGetPetDetailsUseCase();

	const { pet, location } = await detailsUseCase.execute({
		petId: petId,
	});

	return reply.status(200).send({ pet, location });
}
