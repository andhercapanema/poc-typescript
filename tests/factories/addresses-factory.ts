import { prisma } from "@/config";
import { faker } from "@faker-js/faker";

export async function createAddress(customerId: number) {
    return prisma.address.create({
        data: {
            street: faker.address.street(),
            number: faker.datatype.number().toString(),
            zip_code: faker.address.zipCode("########"),
            district: faker.address.city(),
            city: faker.address.city(),
            state: faker.address.state(),
            customer_id: customerId,
        },
    });
}
