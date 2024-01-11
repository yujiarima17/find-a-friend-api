import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { details } from "./details";
import { verifyJWT } from "@/http/middlewares/verfiy-jwt";
import { refresh } from "./refresh";
export async function orgsRoutes(app: FastifyInstance) {
	app.post("/orgs", register);
	app.get("/details", { onRequest: [verifyJWT] }, details);
	app.post("/sessions", authenticate);
	app.patch("/token/refresh", refresh);
}
