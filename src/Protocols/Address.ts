export type AddressEntity = {
    id: number;
    street: string;
    number: number;
    zip_code: string;
    complement: string;
    district: string;
    reference: string;
    city_id: number;
};

export type AddressCheck = {
    id: number;
    stateExists: boolean;
    cityExists: boolean;
    addressExists: boolean;
};

export type Address = {
    street: string;
    number: number;
    zipCode: string;
    complement: string;
    district: string;
    reference: string;
};
