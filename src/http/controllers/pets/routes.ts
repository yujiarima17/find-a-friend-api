import { FastifyInstance } from "fastify";
import { register } from "./register";
import { details } from "./details";
import { fetch } from "./fetch";

export async function petsRoutes(app: FastifyInstance) {
	app.post("/:orgId/pets", register);
	app.get("/pets/:petId", details);
	// utiliza query params
	app.get("/pets",fetch);
}
