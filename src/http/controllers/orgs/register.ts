import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { RegisterUseCase } from "@/use-cases/orgs/register";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { PrismaAddressRepository } from "@/repositories/prisma/prisma-address-repository";
import { OrgsAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";

export async function register(request: FastifyRequest, reply: FastifyReply) {
	const phoneRegex = new RegExp(
		/([0-9]{2,3})?(\([0-9]{2}\))([0-9]{4,5})([0-9]{4})/
	);

	const registerBodySchema = z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string().min(6),
		whatsapp: z.string().regex(phoneRegex),
		street: z.string(),
		addressNumber: z.number(),
		city: z.string(),
	});

	const { email, name, password, whatsapp, addressNumber, city, street } =
		registerBodySchema.parse(request.body);

	try {
		const prismaOrgsRepository = new PrismaOrgsRepository();
		const prismaAddressRepository = new PrismaAddressRepository();

		const registerUseCase = new RegisterUseCase(
			prismaOrgsRepository,
			prismaAddressRepository
		);

		await registerUseCase.execute({
			email,
			name,
			password,
			whatsapp,
			addressNumber,
			city,
			street,
		});
	} catch (error) {
		if (error instanceof OrgsAlreadyExistsError) {
			return reply.status(409).send({ message: error.message });
		}

		throw error;
	}

	return reply.status(201).send();
}
