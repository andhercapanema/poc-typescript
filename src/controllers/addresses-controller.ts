import { getCEPData, updateAddress } from "@/services";
import { Request, Response } from "express";

async function getCepData(req: Request, res: Response) {
    try {
        const cepData = await getCEPData(req.params.cep);
        res.send(cepData);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

async function patchAddress(req: Request, res: Response) {
    try {
        await updateAddress(parseInt(req.params.id), req.body);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
}

export { getCepData, patchAddress };
