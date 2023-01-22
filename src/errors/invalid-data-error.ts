import { ApplicationError } from "../Protocols/ApplicationError";

export default function invalidDataError(
    details: string[]
): ApplicationInvalidateDataError {
    return {
        name: "InvalidDataError",
        message: "Invalid data",
        details,
    };
}

type ApplicationInvalidateDataError = ApplicationError & {
    details: string[];
};
