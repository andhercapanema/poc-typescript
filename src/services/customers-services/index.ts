import { notFoundError } from "@/errors";
import { CustomerCreateInput } from "@/Protocols";
import AddressesRepository from "@/repositories/address-repository";
import CustomersRepository from "@/repositories/customers-repository";

export async function createNewCustomer(newCustomerData: CustomerCreateInput) {
    return await CustomersRepository.createCustomer(newCustomerData);
}

export const getAllCustomersFromDb = async () =>
    await CustomersRepository.selectAllCustomers();

export async function getCustomerByIdFromDb(customerId: number) {
    const customer = await CustomersRepository.selectCustomersById(customerId);
    if (!customer) throw notFoundError("Customer");

    return customer;
}

export async function updateCustomer(
    customerId: number,
    customerDataToUpdate: CustomerCreateInput
) {
    await getCustomerByIdFromDb(customerId);

    await CustomersRepository.updateCustomerById(
        customerId,
        customerDataToUpdate
    );
}

export async function deleteCustomerFromDb(customerId: number) {
    await getCustomerByIdFromDb(customerId);

    await AddressesRepository.deleteAddressesByCustomerId(customerId);

    await CustomersRepository.deleteCustomerById(customerId);
}
