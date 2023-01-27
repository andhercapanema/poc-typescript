import { Customer } from "@prisma/client";
import { AddressCreateInput } from "./Address";

export type CustomerWithAddress = CustomerCreateInput & {
    address: AddressCreateInput;
};

export type CustomerCreateInput = Omit<
    Customer,
    "id" | "birth_date" | "created_at" | "updated_at"
> & {
    birthDate: Date;
};
