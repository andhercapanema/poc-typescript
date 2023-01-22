import { Request, Response } from "express";
import { Customer } from "../Protocols/Customer.js";
import CustomersRepository from "../repositories/customers-repository.js";
import {
    createNewAddress,
    checkIfAddressExists,
    getAddressId,
    getCEPData,
    createAddressIfItDoesntExists,
} from "../services/addresses-services.js";
import {
    createNewUser,
    getAllCustomersFromDb,
    updateCustomer,
} from "../services/customers-services.js";

async function postNewCustomer(req: Request, res: Response) {
    const { name, cpf, phone, birthDate, address } = req.body as Customer;

    try {
        const addressId = await createAddressIfItDoesntExists(address);

        await createNewUser({ name, cpf, phone, birthDate }, addressId);
        res.sendStatus(201);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

async function getAllCustomers(req: Request, res: Response) {
    try {
        const customers = await getAllCustomersFromDb();
        res.send(customers);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

async function patchCustomerById(req: Request, res: Response) {
    const { name, cpf, phone, birthDate, address } = req.body as Customer;
    const customerId = req.params.id;

    try {
        const addressId = await createAddressIfItDoesntExists(address);

        await updateCustomer(
            { customerId, name, cpf, phone, birthDate },
            addressId
        );

        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

export { postNewCustomer, getAllCustomers, patchCustomerById };
