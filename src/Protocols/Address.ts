import { Address } from "@prisma/client";

export type AddressCreateInput = Omit<
    Address,
    "id" | "zip_code" | "customer_id" | "created_at" | "updated_at"
> & {
    zipCode: string;
};
