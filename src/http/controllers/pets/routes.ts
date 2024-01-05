import { FastifyInstance } from "fastify";
import { register } from "./register";
import { details } from "./details";


export async function petsRoutes(app: FastifyInstance) {
	app.post("/:orgId/pets", register);
	app.get("/pets/:petId", details);
}
