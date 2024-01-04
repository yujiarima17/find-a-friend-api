import { MakeRegisterUseCase } from "@/use-cases/factories/pets/make-register-use-case";
import { RegisterUseCase } from "@/use-cases/pets/register";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
export async function register(request: FastifyRequest, reply: FastifyReply) {
	const registerParamsSchema = z.object({
		orgId: z.string().uuid(),
	});

	const registerBodySchema = z.object({
		age: z.number().min(0).default(0),
		breed: z.string(),
		color: z.string(),
		isAdopted: z.boolean(),
		characteristics: z.string().array().default([]),
	});

	const { age, breed, characteristics, color, isAdopted } =
		registerBodySchema.parse(request.body);
	const { orgId } = registerParamsSchema.parse(request.params);

	try {
		const registerUseCase = MakeRegisterUseCase();

		await registerUseCase.execute({
			age,
			breed,
			characteristics,
			color,
			isAdopted,
			org_id: orgId,
		});
	} catch (error) {
		throw error;
	}
	return reply.status(201).send();
}
