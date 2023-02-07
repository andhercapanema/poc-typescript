import { prisma } from "@/config";

export async function cleanDb() {
    await prisma.$executeRaw`
        TRUNCATE TABLE addresses, debits, customers
        RESTART IDENTITY
        CASCADE;
    `;
}
