import { InvalidCepError } from "@/use-cases/errors/invalid-cep-error";
import axios from "axios";

interface findCityAndStateByCepResponse {
	city: string;
	state: string;
}
export async function findCityAndStateByCep(
	cep: string
): Promise<findCityAndStateByCepResponse | null> {
	const response = await axios
		.get(`https://viacep.com.br/ws/${cep}/json/`)
		.then((value) => value.data);

	if (response.erro) {
		console.log('oi')
		return null;
	}
	const { uf, localidade } = response;

	return { city: uf, state: localidade };
}
