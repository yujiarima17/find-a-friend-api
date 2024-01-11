import { MakeGetOrgDetailsUseCase } from "@/use-cases/factories/orgs/make-get-org-details";
import { FastifyReply, FastifyRequest } from "fastify";

export async function details(request: FastifyRequest, reply: FastifyReply) {

	const getOrgDetails = MakeGetOrgDetailsUseCase();

	const { org } = await getOrgDetails.execute({
		id: request.user.sub,
	});

	return reply.status(200).send({
		org: {
			...org,
			password_hash: undefined,
		},
	});
}
