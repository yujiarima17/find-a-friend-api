import { FastifyInstance } from "fastify";
import { register } from "./register";
import { details } from "./details";
import { fetch } from "./fetch";
import { verifyUserRole } from "@/http/middlewares/only-admin";
import { verifyJWT } from "@/http/middlewares/verfiy-jwt";

export async function petsRoutes(app: FastifyInstance) {
	app.addHook("onRequest", verifyJWT);
	app.post("/:orgId/pets", { onRequest: [verifyUserRole("ADMIN")] }, register);
	app.get("/pets/:petId", details);
	app.get("/pets", fetch);
}
