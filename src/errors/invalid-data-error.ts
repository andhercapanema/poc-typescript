export default function invalidDataError(
    details: string[]
): ApplicationInvalidateDataError {
    return {
        name: "InvalidDataError",
        message: "Invalid data",
        details,
    };
}

type ApplicationError = {
    name: string;
    message: string;
};

type ApplicationInvalidateDataError = ApplicationError & {
    details: string[];
};
