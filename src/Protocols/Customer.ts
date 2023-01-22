export type Customer = {
    name: string;
    cpf: string;
    phone: string;
    birthDate: Date;
    address: {
        street: string;
        number: number;
        zipCode: string;
        complement: string;
        district: string;
        reference: string;
    };
};
