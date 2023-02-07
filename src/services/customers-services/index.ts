import { badRequestError, notFoundError } from "@/errors";
import { CustomerCreateInput } from "@/Protocols";
import AddressesRepository from "@/repositories/address-repository";
import CustomersRepository from "@/repositories/customers-repository";

export async function createNewCustomer(newCustomerData: CustomerCreateInput) {
    return await CustomersRepository.createCustomer(newCustomerData);
}

export const getAllCustomersFromDb = async () =>
    await CustomersRepository.selectAllCustomers();

export async function getCustomerByIdFromDb(customerId: number) {
    if (isNaN(customerId))
        throw badRequestError("Inserted customer ID is not a number");

    const customer = await CustomersRepository.selectCustomersById(customerId);
    if (!customer) throw notFoundError("Customer");

    return customer;
}

export async function updateCustomer(
    customerId: number,
    customerDataToUpdate: CustomerCreateInput
) {
    await getCustomerByIdFromDb(customerId);

    customerDataToUpdate.birthDate = new Date(customerDataToUpdate.birthDate);

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
