import { AddressRepository } from "@/repositories/address-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { hash } from "bcryptjs";
import { OrgsAlreadyExistsError } from "../errors/org-already-exists-error";
import { Org } from "@prisma/client";
import { NameAlreadyExistsError } from "../errors/org-name-already-exists-error";
import { AddressAlreadyExistsError } from "../errors/org-address-already-exists";
import { WhatsappAlreadyExistsError } from "../errors/org-whatsapp-already-exists-error";

interface RegisterUseCaseRequest {
	name: string;
	password: string;
	email: string;
	addressNumber: number;
	whatsapp: string;
	city: string;
	street: string;
}
interface RegisterUseCaseResponse {
	org: Org;
}
export class RegisterUseCase {
	constructor(
		private orgsRepository: OrgsRepository,
		private addressRepository: AddressRepository
	) {}
	async execute({
		password,
		addressNumber,
		city,
		email,
		name,
		whatsapp,
		street,
	}: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
		const password_hash = await hash(password, 6);

		const orgWithSameWhatsapp = await this.orgsRepository.findByWhatsapp(
			whatsapp
		);

		const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

		const orgWithSameName = await this.orgsRepository.findByName(name);

		const orgsWithSameAddress =
			await this.addressRepository.findByNumberAndStreet(street, addressNumber);

		if (orgWithSameEmail) {
			throw new OrgsAlreadyExistsError();
		}

		if (orgWithSameWhatsapp) {
			throw new WhatsappAlreadyExistsError();
		}

		if (orgWithSameName) {
			throw new NameAlreadyExistsError();
		}

		if (orgsWithSameAddress) {
			throw new AddressAlreadyExistsError();
		}
		const address = await this.addressRepository.create({
			city,
			street,
			number: addressNumber,
		});

		const org = await this.orgsRepository.create({
			password_hash,
			email,
			name,
			whatsapp,
			address_id: address.id,
		});

		return { org };
	}
}
