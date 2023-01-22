import axios from "axios";
import AddressesRepository from "../repositories/address-repository.js";
import CitiesRepository from "../repositories/cities.repository.js";
import StatesRepository from "../repositories/states.repository.js";

export async function getCEPData(cep: string): Promise<CEPData> {
    const res = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return res.data;
}

export async function checkIfAddressExists(CEPData, address) {
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

export async function createNewAddress(addressInDb, CEPData, address) {
    if (!addressInDb.stateExists) {
        await StatesRepository.insertNewState(CEPData.uf);
    }

    const state = await StatesRepository.selectStateByName(CEPData.uf);

    if (!addressInDb.cityExists) {
        await CitiesRepository.insertNewCity(CEPData.localidade, state.id);
    }

    const city = await CitiesRepository.selectCityByName(
        CEPData.localidade,
        CEPData.uf
    );

    if (!addressInDb.addressExists) {
        await AddressesRepository.insertNewAddress(address, city.id);
    }
}

export async function getAddressId(CEPData, address) {
    const addressId = await AddressesRepository.selectAddressIdByFilter(
        address,
        CEPData
    );

    return addressId;
}

export async function createAddressIfItDoesntExists(address) {
    const CEPData = await getCEPData(address.zipCode);

    if (CEPData.logradouro !== "") address.street = CEPData.logradouro;
    if (CEPData.bairro !== "") address.district = CEPData.bairro;

    let addressInDb = await checkIfAddressExists(CEPData, address);

    if (!addressInDb.id) {
        await createNewAddress(addressInDb, CEPData, address);
        addressInDb = await getAddressId(CEPData, address);
    }

    return addressInDb.id;
}

type CEPData = {
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
