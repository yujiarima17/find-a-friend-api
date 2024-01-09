import { OrgsRepository } from "@/repositories/orgs-repository";
import { hash } from "bcryptjs";
import { OrgsAlreadyExistsError } from "../errors/org-already-exists-error";
import { Org } from "@prisma/client";
import { WhatsappAlreadyExistsError } from "../errors/org-whatsapp-already-exists-error";
import { AddressAlreadyExistsError } from "../errors/org-address-already-exists";
import { findCityAndStateByCep } from "@/utils/find-city-and-state-by-cep";
import { InvalidCepError } from "../errors/invalid-cep-error";

interface RegisterUseCaseRequest {
	password: string;
	email: string;
	adressNumber: number;
	whatsapp: string;
	cep: string;
	owner: string;
	adress: string;
}
interface RegisterUseCaseResponse {
	org: Org;
}
export class RegisterUseCase {
	constructor(private orgsRepository: OrgsRepository) {}
	async execute({
		password,
		adressNumber,
		owner,
		cep,
		email,
		adress,
		whatsapp,
	}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
		const password_hash = await hash(password, 6);

		const orgWithSameWhatsapp = await this.orgsRepository.findByWhatsapp(
			whatsapp
		);

		const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

		const orgWithSameAdressAndNumber =
			await this.orgsRepository.findByAdressAndNumber(adress, adressNumber);

		if (orgWithSameEmail) {
			throw new OrgsAlreadyExistsError();
		}

		if (orgWithSameWhatsapp) {
			throw new WhatsappAlreadyExistsError();
		}

		if (orgWithSameAdressAndNumber) {
			throw new AddressAlreadyExistsError();
		}

		const response = await findCityAndStateByCep(cep);
       
		if (!response) {
			throw new InvalidCepError();
		}

		const org = await this.orgsRepository.create({
			password_hash,
			email,
			whatsapp,
			adress,
			adress_number: adressNumber,
			cep,
			city: response.city,
			state: response.state,
			owner,
		});

		return { org };
	}
}
