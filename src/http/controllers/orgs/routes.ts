import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { details } from "./details";
export async function orgsRoutes(app: FastifyInstance) {
	app.post("/orgs", register);
	app.get("/details",details)
	app.post("/sessions", authenticate);
}
