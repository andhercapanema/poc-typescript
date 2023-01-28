import { prisma } from "@/config";
import {
    DatabaseDebitCreateInput,
    DebitCreateInput,
    DebitSearchParams,
} from "@/Protocols";
import { camelToSnakeCaseKeys } from "@/utils/prisma-utils";

const DebitsRepository = {
    create: async (debitCreateInput: DebitCreateInput) => {
        return prisma.debit.create({
            data: camelToSnakeCaseKeys(
                debitCreateInput
            ) as DatabaseDebitCreateInput,
        });
    },
    findMany: async (searchParams: DebitSearchParams) => {
        return prisma.debit.findMany({
            where: camelToSnakeCaseKeys(searchParams),
        });
    },
    updatePaidToTrue: async (id: number) => {
        return prisma.debit.update({
            where: {
                id,
            },
            data: {
                paid: true,
            },
        });
    },
};

export default DebitsRepository;
