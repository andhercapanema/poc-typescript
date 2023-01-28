import { Debit } from "@prisma/client";

export type DebitCamelCase = Omit<
    Debit,
    "due_at" | "created_at" | "updated_at" | "customer_id"
> & {
    dueAt: Date;
    createdAt: Date;
    updatedAt: Date;
    customerId: number;
};

export type DebitCreateInput = Omit<
    DebitCamelCase,
    "id" | "paid" | "createdAt" | "updatedAt"
>;

export type DebitSearchParams = Partial<DebitCamelCase>;

export type RequestDebitSearchParams = DebitSearchParams & {
    id?: number | string;
    value?: number | string;
    paid?: boolean | string;
    dueAt?: Date | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    customerId?: number | string;
};

export type DatabaseDebitCreateInput = {
    value: number;
    due_at: Date;
    customer_id: number;
};
