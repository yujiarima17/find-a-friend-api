import { MakeGetPetDetailsUseCase } from "@/use-cases/factories/pets/make-get-pet-details-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
export async function details(request: FastifyRequest, reply: FastifyReply) {
	const registerParamsSchema = z.object({
		petId: z.string().uuid(),
	});

	const { petId } = registerParamsSchema.parse(request.params);

	const registerUseCase = MakeGetPetDetailsUseCase();

	const { pet } = await registerUseCase.execute({
		petId: petId,
	});

	return reply.status(200).send({ pet });
}
