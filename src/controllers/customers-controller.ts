import { Request, Response } from "express";
import { Customer, CustomerWithAddress } from "../Protocols/Customer.js";
import { createAddressIfItDoesntExists } from "../services/addresses-services.js";
import {
    createNewUser,
    deleteCustomerFromDb,
    getAllCustomersFromDb,
    getCustomerByIdFromDb,
    updateCustomer,
} from "../services/customers-services.js";

async function postNewCustomer(req: Request, res: Response) {
    const { name, cpf, phone, birthDate, address } =
        req.body as CustomerWithAddress;
    const NewCustomerData: Customer = { name, cpf, phone, birthDate };

    try {
        const addressId = await createAddressIfItDoesntExists(address);

        await createNewUser(NewCustomerData, addressId);
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
    const { name, cpf, phone, birthDate, address } =
        req.body as CustomerWithAddress;
    const customerDataToUpdate: Customer = { name, cpf, phone, birthDate };
    const customerId = Number(req.params.id);

    try {
        const addressId = await createAddressIfItDoesntExists(address);

        await updateCustomer(customerId, customerDataToUpdate, addressId);

        res.sendStatus(200);
    } catch (err) {
        if (err.name === "NotFoundError") {
            return res.status(404).send({ message: err.message });
        }

        console.error(err);
        res.status(500).send(err.message);
    }
}

async function deleteCustomerById(req: Request, res: Response) {
    const customerId = Number(req.params.id);

    try {
        await deleteCustomerFromDb(customerId);

        res.sendStatus(200);
    } catch (err) {
        if (err.name === "NotFoundError") {
            return res.status(404).send({ message: err.message });
        }

        console.error(err);
        res.status(500).send(err.message);
    }
}

async function getCustomerById(req: Request, res: Response) {
    const customerId = Number(req.params.id);

    try {
        const customer = await getCustomerByIdFromDb(customerId);
        res.send(customer);
    } catch (err) {
        if (err.name === "NotFoundError") {
            return res.status(404).send({ message: err.message });
        }

        console.error(err);
        res.status(500).send(err.message);
    }
}

export {
    postNewCustomer,
    getAllCustomers,
    patchCustomerById,
    deleteCustomerById,
    getCustomerById,
};
