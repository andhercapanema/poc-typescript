import { prisma } from "@/config";

export async function cleanDb() {
    await prisma.address.deleteMany({});
    await prisma.debit.deleteMany({});
    await prisma.customer.deleteMany({});
}
