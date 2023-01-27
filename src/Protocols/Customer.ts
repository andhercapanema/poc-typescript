import { Address } from "./Address";

export type CustomerEntity = {
    id: number;
    name: string;
    cpf: string;
    phone: string;
    birth_date: Date;
    created_at: Date;
    updated_at: Date;
};

export type CustomerWithAddress = {
    name: string;
    cpf: string;
    phone: string;
    birthDate: Date;
    address: Address;
};

export type Customer = {
    name: string;
    cpf: string;
    phone: string;
    birthDate: Date;
};
