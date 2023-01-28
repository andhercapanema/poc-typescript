import {
    DebitCreateInput,
    DebitSearchParams,
    PayDebitInput,
    RequestDebitSearchParams,
} from "@/Protocols";
import DebitsRepository from "@/repositories/debit-repository";
import { turnInto } from "@/utils/prisma-utils";
import { addMonths } from "date-fns";

export async function createNewDebit(debitCreateInput: DebitCreateInput) {
    const { dueAt } = debitCreateInput;
    debitCreateInput.dueAt = dueAt ? new Date(dueAt) : addMonths(new Date(), 1);

    return await DebitsRepository.create(debitCreateInput);
}

export async function getDebitsFromDb(searchParams: RequestDebitSearchParams) {
    const numberedSearchParams = turnInto.number(
        searchParams,
        "id",
        "value",
        "customerId"
    ) as RequestDebitSearchParams;

    const booleanedSearchParams = turnInto.boolean(
        numberedSearchParams,
        "paid"
    ) as RequestDebitSearchParams;

    const databaseTypesSearchParams = turnInto.Date(
        booleanedSearchParams,
        "dueAt",
        "createdAt",
        "updatedAt"
    ) as DebitSearchParams;

    const debits = await DebitsRepository.findMany(databaseTypesSearchParams);

    return debits;
}

export async function updateDebitPaidStatus(payDebitInput: PayDebitInput) {
    return await DebitsRepository.updatePaidToTrue(payDebitInput.id);
}
