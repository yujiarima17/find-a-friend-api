import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PrismaOrgsRepository } from "@/repositories/prisma/prisma-orgs-repository";
import { OrgsAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { AuthenticateUseCase } from "@/use-cases/orgs/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

export async function authenticate(
	request: FastifyRequest,
	reply: FastifyReply
) {
	const authenticateBodySchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
	});

	const { email, password } = authenticateBodySchema.parse(request.body);

	try {
		const prismaOrgsRepository = new PrismaOrgsRepository();

		const authenticateUseCase = new AuthenticateUseCase(prismaOrgsRepository);

		await authenticateUseCase.execute({
			email,
			password,
		});

	} catch (error) {
		if (error instanceof InvalidCredentialsError) {
			return reply.status(409).send({ message: error.message });
		}

		throw error;
	}

	return reply.status(200).send();
}