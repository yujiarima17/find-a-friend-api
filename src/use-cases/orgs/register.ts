import { AddressRepository } from "@/repositories/address-repository";
import { OrgsRepository } from "@/repositories/orgs-repository";
import { hash } from "bcryptjs";
import { OrgsAlreadyExistsError } from "../errors/org-already-exists-error";

interface RegisterUseCaseRequest {
	name: string;
	password: string;
	email: string;
	addressNumber: number;
	whatsapp: string;
	city: string;
	street: string;
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
	}: RegisterUseCaseRequest) {
    
		const password_hash = await hash(password, 6);
       
		const address = await this.addressRepository.create({
			city,
			street,
			number: addressNumber,
		});

		const orgWithSameEmail = await this.orgsRepository.findByEmail(email);

		if (orgWithSameEmail) {
			throw new OrgsAlreadyExistsError();
		}
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
