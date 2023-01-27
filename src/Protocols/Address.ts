export type AddressEntity = {
    id: number;
    street: string;
    number: number;
    zip_code: string;
    complement: string;
    district: string;
    reference: string;
    city: string;
    state: string;
    customer_id: number;
};

export type Address = {
    street: string;
    number: number;
    zipCode: string;
    complement: string;
    district: string;
    reference: string;
    city: string;
    state: string;
};
