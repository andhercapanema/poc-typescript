import { createNewDebit } from "@/services";
import { Request, Response } from "express";

async function postNewDebit(req: Request, res: Response) {
    try {
        const createdDebit = await createNewDebit(req.body);
        res.status(201).send(createdDebit);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

async function getDebts(req: Request, res: Response) {
    try {
        res.status(220).send("GET /debits");
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

export { postNewDebit, getDebts };
