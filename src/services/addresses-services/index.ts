import { badRequestError, notFoundError, requestError } from "@/errors";
import { AddressCreateInput } from "@/Protocols";
import AddressesRepository from "@/repositories/address-repository";
import axios from "axios";

export async function viacepRequest(
    inputCep: string
): Promise<ViaCEPAddressError | CEPDataResponse> {
    try {
        const { data } = await axios.get(
            `https://viacep.com.br/ws/${inputCep}/json/`
        );

        return data;
    } catch (err) {
        const { status, statusText } = err.response;
        throw requestError(status, statusText);
    }
}

export async function getCEPData(inputCep: string): Promise<CEPData> {
    const viacepResponse = await viacepRequest(inputCep);

    const viaCEPAddressError = viacepResponse as ViaCEPAddressError;
    if (viaCEPAddressError.erro) throw notFoundError("CEP");

    const { cep, logradouro, bairro, localidade, uf } =
        viacepResponse as CEPDataResponse;
    return { cep, logradouro, bairro, localidade, uf };
}

export async function createNewAddress(
    address: AddressCreateInput,
    customerId: number
) {
    await AddressesRepository.createAddress(address, customerId);
}

export async function getAddressByIdFromDb(id: number) {
    if (isNaN(id)) throw badRequestError("Inserted address ID is not a number");

    const address = await AddressesRepository.selectAddressById(id);
    if (!address) throw notFoundError("Address");

    return address;
}

export async function updateAddress(
    id: number,
    addressDataToUpdate: AddressCreateInput
) {
    await getAddressByIdFromDb(id);

    await AddressesRepository.updateAddressById(id, addressDataToUpdate);
}

export type CEPDataResponse = {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
};

export type CEPData = Omit<
    CEPDataResponse,
    "complemento" | "ibge" | "gia" | "ddd" | "siafi"
>;

export type ViaCEPAddressError = {
    erro: boolean;
};
