import { Request, Response } from "express";
import { Customer } from "../Protocols/Customer.js";
import CustomersRepository from "../repositories/customers-repository.js";
import {
    createNewAddress,
    checkIfAddressExists,
    getAddressId,
    getCEPData,
} from "../services/addresses-services.js";
import { createNewUser } from "../services/customers-services.js";

async function postNewCustomer(req: Request, res: Response) {
    const { name, cpf, phone, birthDate, address } = req.body as Customer;

    try {
        const CEPData = await getCEPData(address.zipCode);

        if (CEPData.logradouro !== "") address.street = CEPData.logradouro;
        if (CEPData.bairro !== "") address.district = CEPData.bairro;

        let addressInDb = await checkIfAddressExists(CEPData, address);

        if (!addressInDb.id) {
            await createNewAddress(addressInDb, CEPData, address);
            addressInDb = await getAddressId(CEPData, address);
        }

        await createNewUser({ name, cpf, phone, birthDate }, addressInDb.id);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

async function getAllCustomers(req: Request, res: Response) {
    try {
        const customers = await CustomersRepository.selectAllCustomers();
        res.send(customers);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

export { getAllCustomers, postNewCustomer };
