import { ApplicationError } from "../Protocols/ApplicationError";

export function notFoundError(entity: string): ApplicationError {
    return {
        name: "NotFoundError",
        message: `Could not find specified "${entity}"!`,
    };
}
