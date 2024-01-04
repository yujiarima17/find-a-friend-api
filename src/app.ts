import fastify from "fastify";
import { orgsRoutes } from "./http/controllers/orgs/routes";
import { ZodError } from "zod";
import { env } from "./env";
import { petsRoutes } from "./http/controllers/pets/routes";

export const app = fastify();

app.register(orgsRoutes);
app.register(petsRoutes);

app.setErrorHandler((error, request, reply) => {
	if (error instanceof ZodError) {
		return reply
			.status(400)
			.send({ message: "Validation Error", issues: error.format() });
	}

	if (env.NODE_ENV !== "production") {
		console.error(error);
	}

	return reply.status(500).send({ message: "Internal Server Error!" });
});
