import { ObjectSchema } from "joi";
import { NextFunction, Request, Response } from "express";
import invalidDataError from "../errors/invalid-data-error.js";

export function validateBody(schema: ObjectSchema): ValidationMiddleware {
    return validate(schema, "body");
}

function validate(schema: ObjectSchema, type: "body" | "params") {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req[type], {
            abortEarly: false,
        });

        if (!error) {
            return next();
        }

        res.status(400).send(
            invalidDataError(error.details.map((detail) => detail.message))
        );
    };
}

type ValidationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => void;
