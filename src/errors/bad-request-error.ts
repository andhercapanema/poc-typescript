import { ApplicationError } from "../Protocols/ApplicationError";

export function badRequestError(detail: string): ApplicationError {
    return {
        name: "BadRequestError",
        message: `Bad Request: "${detail}"!`,
    };
}
