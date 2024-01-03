import { OrgsRepository } from "@/repositories/orgs-repository";
import { compare } from "bcryptjs";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";
import { Org } from "@prisma/client";

interface AuthenticateUseCaseRequest {
	password: string;
	email: string;
}
interface AuthenticateUseCaseResponse {
	org: Org;
}
export class AuthenticateUseCase {
	constructor(private orgsRepository: OrgsRepository) {}
	async execute({
		password,
		email,
	}: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
		const org = await this.orgsRepository.findByEmail(email);

		if (!org) {
			throw new InvalidCredentialsError();
		}

		const doesPasswordMatches = await compare(password, org.password_hash);

		if (!doesPasswordMatches) {
			throw new InvalidCredentialsError();
		}

		return { org };
	}
}
