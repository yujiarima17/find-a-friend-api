import "@fastify/jwt";
interface FastifyJWT {}
declare module "@fastify/jwt" {
	export interface FastifyJWT {
		user: {
			sub: string;
			role: "ADMIN" | "MEMBER";
		};
	}
}
