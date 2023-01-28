export function exclude<T, Key extends keyof T>(
    entity: T,
    ...keys: Key[]
): Omit<T, Key> {
    const newEntity = JSON.parse(JSON.stringify(entity));
    for (const key of keys) {
        delete newEntity[key];
    }
    return newEntity;
}

export function camelToSnakeCaseKeys<T>(camelCaseEntity: T) {
    let snakeCaseEntity: Partial<T> = { ...camelCaseEntity };

    Object.keys(camelCaseEntity).forEach((camelCaseKey) => {
        if (/[A-Z]/.test(camelCaseKey)) {
            let snakeCaseKey = "";

            [...camelCaseKey].forEach((letter) => {
                if (/[A-Z]/.test(letter)) {
                    snakeCaseKey += "_" + letter.toLowerCase();
                } else {
                    snakeCaseKey += letter;
                }
            });

            snakeCaseEntity[snakeCaseKey as keyof T] =
                camelCaseEntity[camelCaseKey as keyof T];

            snakeCaseEntity = exclude(
                snakeCaseEntity,
                camelCaseKey as keyof T
            ) as Partial<T>;
        }
    });

    return snakeCaseEntity;
}

export const turnInto = {
    number: <T>(entity: T, ...keys: string[]): NumberObject => {
        const newEntity = { ...entity } as NumberObject;
        for (const prop in entity) {
            if (keys.includes(prop)) {
                newEntity[prop] = parseInt(entity[prop] as string);
            }
        }
        return newEntity;
    },
    boolean: <T>(entity: T, ...keys: string[]): BooleanObject => {
        const newEntity = { ...entity } as BooleanObject;
        for (const prop in entity) {
            if (keys.includes(prop)) {
                if (entity[prop] === "true") {
                    newEntity[prop] = true;
                } else {
                    newEntity[prop] = false;
                }
            }
        }
        return newEntity;
    },
    Date: <T>(entity: T, ...keys: string[]): DateObject => {
        const newEntity = { ...entity } as DateObject;
        for (const prop in entity) {
            if (keys.includes(prop)) {
                newEntity[prop] = new Date(entity[prop] as string);
            }
        }
        return newEntity;
    },
};

type NumberObject = {
    [n: string]: number;
};

type BooleanObject = {
    [n: string]: boolean;
};

type DateObject = {
    [n: string]: Date;
};
