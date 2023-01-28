import {
    createNewDebit,
    getDebitsFromDb,
    updateDebitPaidStatus,
} from "@/services";
import { Request, Response } from "express";

async function postNewDebit(req: Request, res: Response) {
    try {
        const createdDebit = await createNewDebit(req.body);
        return res.status(201).send(createdDebit);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
}

async function getDebits(req: Request, res: Response) {
    try {
        const debits = await getDebitsFromDb(req.query);
        return res.status(200).send(debits);
    } catch (err) {
        console.error(err);
        return res.status(500).send(err.message);
    }
}

async function payDebit(req: Request, res: Response) {
    try {
        const debit = await updateDebitPaidStatus(req.body);
        return res.status(200).send(debit);
    } catch (err) {
        if (err.name === "NotFoundError") {
            return res.status(404).send({ message: err.message });
        }

        console.error(err);
        return res.status(500).send(err.message);
    }
}

export { postNewDebit, getDebits, payDebit };
