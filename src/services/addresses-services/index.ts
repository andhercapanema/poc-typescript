import { Address, AddressCheck } from "@/Protocols";
import AddressesRepository from "@/repositories/address-repository";
import CitiesRepository from "@/repositories/cities-repository";
import StatesRepository from "@/repositories/states-repository";
import axios from "axios";

export async function getCEPData(cep: string): Promise<CEPData> {
    const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return res.data;
}

export async function checkIfAddressExists(
    CEPData: CEPData,
    address: Address
): Promise<AddressCheck> {
    const state = await StatesRepository.selectStateByName(CEPData.uf);

    if (!state) {
        return {
            stateExists: false,
            cityExists: false,
            addressExists: false,
            id: undefined,
        };
    }

    const city = await CitiesRepository.selectCityByName(
        CEPData.localidade,
        CEPData.uf
    );

    if (!city) {
        return {
            stateExists: true,
            cityExists: false,
            addressExists: false,
            id: undefined,
        };
    }

    const addressId = await AddressesRepository.selectAddressIdByFilter(
        address,
        CEPData
    );

    if (!addressId) {
        return {
            stateExists: true,
            cityExists: true,
            addressExists: false,
            id: undefined,
        };
    }

    return {
        stateExists: true,
        cityExists: true,
        addressExists: true,
        id: addressId.id,
    };
}

export async function createNewAddress(
    addressInDb: AddressCheck,
    CEPData: CEPData,
    address: Address
) {
    if (!addressInDb.stateExists) {
        await StatesRepository.insertNewState(CEPData.uf);
    }

    if (!addressInDb.cityExists) {
        const state = await StatesRepository.selectStateByName(CEPData.uf);
        await CitiesRepository.insertNewCity(CEPData.localidade, state.id);
    }

    if (!addressInDb.addressExists) {
        const city = await CitiesRepository.selectCityByName(
            CEPData.localidade,
            CEPData.uf
        );
        await AddressesRepository.insertNewAddress(address, city.id);
    }
}

export async function getAddressId(
    CEPData: CEPData,
    address: Address
): Promise<number> {
    const addressId = await AddressesRepository.selectAddressIdByFilter(
        address,
        CEPData
    );

    return addressId.id;
}

export async function createAddressIfItDoesntExists(
    address: Address
): Promise<number> {
    const CEPData = await getCEPData(address.zipCode);

    if (CEPData.logradouro !== "") address.street = CEPData.logradouro;
    if (CEPData.bairro !== "") address.district = CEPData.bairro;

    const addressInDb = await checkIfAddressExists(CEPData, address);

    if (!addressInDb.id) {
        await createNewAddress(addressInDb, CEPData, address);
        const addressId = await getAddressId(CEPData, address);
        return addressId;
    }

    return addressInDb.id;
}

export type CEPData = {
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
