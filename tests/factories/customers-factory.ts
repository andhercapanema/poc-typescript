import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import { generateCPF } from "@brazilian-utils/brazilian-utils";
import { createAddress } from "./addresses-factory";

export async function createCustomer() {
    const customer = await prisma.customer.create({
        data: {
            name: faker.name.fullName(),
            cpf: generateCPF(),
            phone: faker.phone.number("###########"),
            birth_date: faker.date.past(),
        },
    });

    await createAddress(customer.id);

    return customer;
}
