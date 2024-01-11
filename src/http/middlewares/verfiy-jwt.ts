import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(request: FastifyRequest, reply: FastifyReply) {
	
	try {
		console.log(request);
		await request.jwtVerify();
		console.log(request.user);
	} catch (error) {
		return reply.status(401).send({ message: "Unauthorized" });
	}
}
