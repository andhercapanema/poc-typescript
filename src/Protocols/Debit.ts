import { Debit } from "@prisma/client";

export type DebitCreateInput = Omit<
    Debit,
    "id" | "paid" | "created_at" | "updated_at" | "customer_id" | "due_at"
> & {
    customerId: number;
    dueAt?: Date;
};
