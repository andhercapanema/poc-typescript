import { notFoundError } from "@/errors";
import { Address } from "@/Protocols";
import AddressesRepository from "@/repositories/address-repository";
import axios from "axios";

export async function getCEPData(inputCep: string): Promise<CEPData> {
    const res = await axios.get(`https://viacep.com.br/ws/${inputCep}/json/`);
    const { cep, logradouro, bairro, localidade, uf } =
        res.data as CEPDataResponse;
    return { cep, logradouro, bairro, localidade, uf };
}

export async function createNewAddress(address: Address, customerId: number) {
    await AddressesRepository.insertNewAddress(address, customerId);
}

export async function getAddressByIdFromDb(id: number) {
    const address = await AddressesRepository.selectAddressById(id);
    if (!address) throw notFoundError("Address");

    return address;
}

export async function updateAddress(id: number, addressDataToUpdate: Address) {
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
