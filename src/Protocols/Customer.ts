import { Address } from "./Address";

export type CustomerEntity = {
    id: number;
    name: string;
    cpf: string;
    phone: string;
    birth_date: Date;
    created_at: Date;
    address_id: number;
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
