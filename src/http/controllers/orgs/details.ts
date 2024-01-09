import { FastifyReply, FastifyRequest } from "fastify";

export async function details(request: FastifyRequest, reply: FastifyReply) {
	await request.jwtVerify();
    
	return reply.status(200).send();
}
