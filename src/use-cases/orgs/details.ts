import { OrgsRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/resource-not-found-error";

interface GetOrgDetailsUseCaseRequest {
	id: string;
}
interface GetOrgDetailsUseCaseResponse {
	org: Org;
}
export class GetOrgDetailsUseCase {
	constructor(private orgsRepository: OrgsRepository) {}
	async execute({
		id,
	}: GetOrgDetailsUseCaseRequest): Promise<GetOrgDetailsUseCaseResponse> {
		const org = await this.orgsRepository.findById(id);

		if (!org) {
			throw new ResourceNotFoundError();
		}

		return { org };
	}
}
