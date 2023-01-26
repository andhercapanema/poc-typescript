import { notFoundError } from "@/errors";
import { Customer } from "@/Protocols";
import CustomersRepository from "@/repositories/customers-repository";

export async function createNewUser(
    NewCustomerData: Customer,
    addressId: number
) {
    await CustomersRepository.insertNewCustomer(NewCustomerData, addressId);
}

export const getAllCustomersFromDb = async () =>
    await CustomersRepository.selectAllCustomers();

export const checkIfUserIdExists = async (customerId: number) =>
    await getCustomerByIdFromDb(customerId);

export async function updateCustomer(
    customerId: number,
    customerDataToUpdate: Customer,
    addressId: number
) {
    await checkIfUserIdExists(customerId);

    await CustomersRepository.updateCustomerById(
        customerId,
        customerDataToUpdate,
        addressId
    );
}

export async function getCustomerByIdFromDb(customerId: number) {
    const customer = await CustomersRepository.selectCustomersById(customerId);
    if (!customer) throw notFoundError("Customer");

    return customer;
}

export async function deleteCustomerFromDb(customerId: number) {
    await checkIfUserIdExists(customerId);

    await CustomersRepository.deleteCustomerById(customerId);
}
