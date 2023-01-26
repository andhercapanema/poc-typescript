import { Request, Response } from "express";
import { ApplicationError } from "../Protocols/ApplicationError";

export function handleApplicationErrors(
    err: ApplicationError | Error,
    _req: Request,
    res: Response
) {
    if (err.name === "CannotEnrollBeforeStartDateError") {
        return res.status(400).send({
            message: err.message,
        });
    }

    if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
        return res.status(409).send({
            message: err.message,
        });
    }

    if (err.name === "InvalidCredentialsError") {
        return res.status(401).send({
            message: err.message,
        });
    }

    if (err.name === "NotFoundError") {
        return res.status(404).send({
            message: err.message,
        });
    }

    /* eslint-disable-next-line no-console */
    console.error(err.name);
    res.status(500).send({
        error: "InternalServerError",
        message: "Internal Server Error",
    });
}
