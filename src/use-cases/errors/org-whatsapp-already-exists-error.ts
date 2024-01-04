export class WhatsappAlreadyExistsError extends Error {
	constructor() {
		super("Whatsapp already exists.");
	}
}
