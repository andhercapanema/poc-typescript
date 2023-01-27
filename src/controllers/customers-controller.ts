import { CustomerCreateInput, CustomerWithAddress } from "@/Protocols";
import {
    createNewAddress,
    createNewCustomer,
    deleteCustomerFromDb,
    getAllCustomersFromDb,
    getCustomerByIdFromDb,
    updateCustomer,
} from "@/services";
import { Request, Response } from "express";

async function postNewCustomer(req: Request, res: Response) {
    const { name, cpf, phone, birthDate, address } =
        req.body as CustomerWithAddress;
    const NewCustomerData: CustomerCreateInput = {
        name,
        cpf,
        phone,
        birthDate,
    };

    try {
        const createdCustomer = await createNewCustomer(NewCustomerData);
        await createNewAddress(address, createdCustomer.id);
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
    try {
        await updateCustomer(parseInt(req.params.id), req.body);
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
    try {
        await deleteCustomerFromDb(Number(req.params.id));
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
    try {
        const customer = await getCustomerByIdFromDb(Number(req.params.id));
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
