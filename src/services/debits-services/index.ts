import { notFoundError } from "@/errors";
import { DebitCreateInput } from "@/Protocols";
import AddressesRepository from "@/repositories/address-repository";
import DebitsRepository from "@/repositories/debit-repository";
import { addMonths } from "date-fns";

export async function createNewDebit(debitCreateInput: DebitCreateInput) {
    const { dueAt } = debitCreateInput;
    debitCreateInput.dueAt = dueAt ? new Date(dueAt) : addMonths(new Date(), 1);

    return await DebitsRepository.createDebit(debitCreateInput);
}

export async function getDebtsFromDb(id: number) {
    const address = await AddressesRepository.selectAddressById(id);
    if (!address) throw notFoundError("Address");

    return address;
}
