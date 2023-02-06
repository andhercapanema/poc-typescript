import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

export async function createDebit(customerId: number) {
    return prisma.debit.create({
        data: {
            customer_id: customerId,
            value: faker.datatype.number(),
            due_at: faker.date.past(),
        },
    });
}
